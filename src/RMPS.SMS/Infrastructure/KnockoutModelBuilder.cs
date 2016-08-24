using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Newtonsoft.Json;
using TestFramework;
namespace RMPS.SMS.Infrastructure
{
   internal static class KnockoutModelBuilder
    {
        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Scan assembles for <see cref="KnockoutAssemblyAttribute"/> and Build Model from types.
        /// </summary>
        ///
        /// <param name="folderPath">
        ///     The folder path to save.
        /// </param>
        ///-------------------------------------------------------------------------------------------------

        public static void Save(string folderPath, Assembly assembly)
        {
            List<Type> types = new List<Type>();
            types.AddRange(assembly.GetExportedTypes().Where(type => (type.GetTypeInfo().IsClass || type.GetTypeInfo().IsEnum) && type.GetTypeInfo().GetCustomAttributes(typeof(TestFramework.KnockoutModelAttribute), false).Any()));

            Save(folderPath, types);
        }

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Build Model from types.
        /// </summary>
        ///
        /// <param name="folderPath">
        ///     The folder path to save.
        /// </param>
        /// <param name="list">
        ///     The list.
        /// </param>
        ///-------------------------------------------------------------------------------------------------
        public static void Save(string folderPath, IReadOnlyList<Type> list)
        {
          string fileName = Path.Combine(folderPath, "models.js");

            if (!File.Exists(fileName))
            {

                using (StreamWriter stream = new StreamWriter(new FileStream(fileName, FileMode.CreateNew, FileAccess.Write), Encoding.UTF8))
                {
                    stream.Write(Build(list));

                }

            }
        }


        private static string Build(IReadOnlyList<Type> list)
        {
            List<Type> extraTypes = new List<Type>();

            StringBuilder sb = new StringBuilder();

            using (StringWriter stream = new StringWriter(sb))
            {
                using (IndentedTextWriter writer = new IndentedTextWriter(stream))
                {
                    foreach (Type type in list)
                    {
                        writer.Indent++;
                        if (type.GetTypeInfo().IsClass)
                        {
                            BuildModel(type, writer, extraTypes);
                        }
                        else if (type.GetTypeInfo().IsEnum)
                        {
                            WriteEnumModel(type, writer);
                        }
                        writer.Indent--;
                    }

                    foreach (Type type in extraTypes)
                    {
                        if (!list.Contains(type))
                        {
                            writer.Indent++;
                            if (type.GetTypeInfo().IsClass)
                            {
                                BuildModel(type, writer);
                            }
                            else if (type.GetTypeInfo().IsEnum)
                            {
                                WriteEnumModel(type, writer);
                            }
                            writer.Indent--;
                        }
                    }

                    writer.WriteLine();
                }

            }

            return sb.ToString();
        }
        private static void BuildModel(Type type, IndentedTextWriter writer, List<Type> extraTypes = null)
        {
            var typeName = type.Name;

            if (type.GetTypeInfo().IsGenericType)
            {
                typeName = typeName.Remove(typeName.IndexOf('`'));
            }

            writer.WriteLine("function " + typeName + "() {");
            writer.Indent++;

            writer.WriteLine("var self = this;");
            writer.WriteLine("self.IsValidatable = ko.observable(true);");
            List<string> ignoreList = new List<string>() { "\"observable\"", "\"validationProperties\"", "\"ignore\"", "\"include\"", "\"type\"", "\"mapping\"", "\"IsValidatable\"", "\"_create\"", "\"hasID\"" };

            List<string> includeList = new List<string>() { "\"_destroy\"" };
            List<string> createList = new List<string>() { };
            List<string> validationList = new List<string>();

            foreach (PropertyInfo p in type.GetProperties().Where(p => p.CanRead))
            {
                bool isIEnumerable = false;
                bool isDictionary = false;
                bool isClass = false;
                Type mappingType = p.PropertyType;

                if (p.GetCustomAttribute<IgnoreAttribute>() != null)
                {
                    ignoreList.Add("\"" + p.Name + "\"");
                    continue;
                }

                if (p.CanWrite)
                {
                    includeList.Add("\"" + p.Name + "\"");
                }
                else
                {
                    ignoreList.Add("\"" + p.Name + "\"");
                }


                if (extraTypes != null)
                {
                    if (typeof(IEnumerable).IsAssignableFrom(p.PropertyType))
                    {
                        if (p.PropertyType.GetTypeInfo().IsGenericType)
                        {
                            mappingType = p.PropertyType.GetGenericArguments()[0];

                            if (!mappingType.GetTypeInfo().ContainsGenericParameters && mappingType.GetTypeInfo().IsClass && mappingType != typeof(string) && mappingType != typeof(object))
                            {
                                if (!extraTypes.Contains(mappingType))
                                {
                                    extraTypes.Add(mappingType);
                                }

                                isIEnumerable = true;
                            }

                        }

                        if (typeof(IDictionary).IsAssignableFrom(p.PropertyType))
                        {
                            createList.Add("\"" + p.Name + "\"");
                            isDictionary = true;
                        }

                    }
                    else if (p.PropertyType.GetTypeInfo().IsEnum || (p.PropertyType.GetTypeInfo().IsClass && p.PropertyType != typeof(string) && p.PropertyType != typeof(object)))
                    {
                        if (!extraTypes.Contains(p.PropertyType))
                        {
                            extraTypes.Add(p.PropertyType);
                        }

                        if (p.PropertyType.GetTypeInfo().IsClass)
                        {
                            isClass = true;
                        }
                    }
                }

                bool isValidatable;

                var extenders = WriteExtenders(p, out isValidatable);

                if (isValidatable)
                {
                    validationList.Add("\"" + p.Name + "\"");
                }


                if (p.PropertyType == typeof(string))
                {
                    writer.WriteLine("self." + p.Name + GetValuePropertyDefaultValue(p));
                    writer.WriteLine("self." + p.Name + extenders + ";");
                }
                else if (p.PropertyType == typeof(DateTime))
                {
                    writer.WriteLine("self." + p.Name + GetValuePropertyDefaultValue(p));
                    writer.WriteLine("self." + p.Name + extenders + ";");
                }
                else if (p.PropertyType == typeof(Guid))
                {
                    writer.WriteLine("self." + p.Name + GetValuePropertyDefaultValue(p));
                    writer.WriteLine("self." + p.Name + extenders + ";");
                }
                else if (p.PropertyType.GetTypeInfo().IsValueType)
                {
                    if (p.PropertyType == typeof(bool))
                    {
                        writer.WriteLine("self." + p.Name + GetValuePropertyDefaultValue(p));
                        writer.WriteLine("self." + p.Name + extenders + ";");
                    }
                    else if (p.PropertyType.GetTypeInfo().IsEnum)
                    {
                        writer.WriteLine("self." + p.Name + GetValuePropertyDefaultValue(p));
                        writer.WriteLine("self." + p.Name + extenders + ";");
                    }
                    else
                    {
                        writer.WriteLine("self." + p.Name + GetValuePropertyDefaultValue(p));
                        writer.WriteLine("self." + p.Name + extenders + ";");
                    }
                }
                else if (typeof(IEnumerable).IsAssignableFrom(p.PropertyType))
                {
                    if (p.PropertyType == typeof(object))
                    {
                        writer.WriteLine("self." + p.Name + " = ko.observableArray();");
                    }
                    else
                    {
                        if (p.PropertyType.GetTypeInfo().IsGenericType)
                        {
                            Type[] typeParameters = p.PropertyType.GetGenericArguments();

                            if (typeParameters.Length > 1)
                            {
                                isIEnumerable = false;
                            }
                        }
                        if (isDictionary)
                        {
                            writer.WriteLine("self." + p.Name + " = ko.observableDictionary();");
                            writer.WriteLine("self." + p.Name + extenders + ";");
                        }
                        else if (isIEnumerable)
                        {
                            var mappingName = mappingType.Name;
                            writer.WriteLine("self." + p.Name + " = ko.observableArray().mapping(function(){ return new " + mappingName + "(); });");
                            writer.WriteLine("self." + p.Name + extenders + ";");
                        }
                        else
                        {
                            writer.WriteLine("self." + p.Name + " = ko.observableArray();");
                            writer.WriteLine("self." + p.Name + extenders + ";");
                        }
                    }
                }
                else if (p.PropertyType.GetTypeInfo().IsClass)
                {
                    WriteObservable(writer, p, isClass, mappingType);
                }
            }

            writer.WriteLine("self.include = [" + string.Join(", ", includeList) + "];");
            //writer.WriteLine("self.validationModel = ko.validatedObservable({" + string.Join(", ", validationList) + "});");
            writer.WriteLine("self.validationProperties = [" + string.Join(", ", validationList) + "];");

            writer.WriteLine("self._create = [" + string.Join(", ", createList) + "];");
            writer.WriteLine("self.ignore = [" + string.Join(", ", ignoreList) + "];");
            writer.WriteLine("self.type = \"" + type.FullName + "\";");
            writer.WriteLine("ko.utils.makeComputeds(self);");
            writer.WriteLine("ko.utils.makeAsynCommands(self);");

            writer.WriteLine("ko.initModel(self);");
            writer.WriteLine("if (self.init) self.init();");

            //writer.WriteLine("self._Observable = false;");


            writer.WriteLine("}");
            writer.WriteLine();

            writer.WriteLine(typeName + ".Mapping = function(){ return new " + typeName + "(); }");

            writer.WriteLine();
            writer.Indent--;
        }

        private static string GetValuePropertyDefaultValue(PropertyInfo property)
        {
            DefaultValueAttribute defaultValueAttribute = property.GetCustomAttribute<DefaultValueAttribute>();
            if (defaultValueAttribute != null)
            {
                if (property.PropertyType == typeof(string) || property.PropertyType == typeof(DateTime) || property.PropertyType == typeof(Guid))
                {
                    return $" = ko.observable(\"{defaultValueAttribute.Value}\");";
                }

                if (property.PropertyType == typeof(bool))
                {
                    string str = bool.Parse(defaultValueAttribute.Value.ToString()) ? "true" : "false";
                    return $"= ko.observable({str});";
                }

                if (property.PropertyType.GetTypeInfo().IsEnum)
                {
                    try
                    {
                        var enumValue = ((Enum)Enum.Parse(property.PropertyType, Convert.ToString(defaultValueAttribute.Value))).ToString("G");

                        return $" = ko.observable(\"{enumValue}\");";
                    }
                    catch (Exception)
                    {
                        return " = ko.observable();";
                    }
                }

                return $" = ko.observable({defaultValueAttribute.Value});";
            }
            return " = ko.observable();";
        }

        private static void WriteObservable(IndentedTextWriter writer, PropertyInfo p, bool init, Type mappingType)
        {
            if (p.PropertyType == typeof(object))
            {
                writer.WriteLine("self." + p.Name + " = ko.observable();");
            }
            else
            {
                if (init)
                {
                    writer.WriteLine("self." + p.Name + " = ko.observable(new " + p.PropertyType.Name + "());");

                }
                else
                {
                    writer.WriteLine("self." + p.Name + " = ko.observable().mapping(function(){ return new " + mappingType.Name + "(); })");
                }
            }
        }


        private static string WriteExtenders(PropertyInfo p, out bool isValidatable)
        {
            isValidatable = false;
            StringBuilder sb = new StringBuilder();
            sb.Append(".extend({ editState : false, disableValidation : false, empty : true })");

            RequiredAttribute requiredAttribute = p.GetCustomAttribute<RequiredAttribute>();
            if (requiredAttribute != null)
            {
                
                sb.Append($".extend({{ required: {{ message: \"{requiredAttribute.FormatErrorMessage(p.Name)}\", onlyIf: function() {{ return ko.utils.isPropertyValidatable(self, \"{ p.Name}\"); }} }} }})");
                isValidatable = true;
            }

            MinLengthAttribute minLengthAttribute = p.GetCustomAttribute<MinLengthAttribute>();
            if (minLengthAttribute != null)
            {

                sb.Append(string.Format(".extend({ minLength: { message: \"{0}\", params: {1}, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",minLengthAttribute.FormatErrorMessage(p.Name), minLengthAttribute.Length, p.Name));
                isValidatable = true;
            }

            MaxLengthAttribute maxLengthAttribute = p.GetCustomAttribute<MaxLengthAttribute>();
            if (maxLengthAttribute != null)
            {
                sb.Append(string.Format(".extend({ maxLength: { message: \"{0}\", params: {1}, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",maxLengthAttribute.FormatErrorMessage(p.Name), maxLengthAttribute.Length, p.Name));
                isValidatable = true;
            }

            RegularExpressionAttribute regularExpressionAttribute = p.GetCustomAttribute<RegularExpressionAttribute>();
            if (regularExpressionAttribute != null)
            {
                sb.Append(string.Format(".extend({ pattern: { message: \"{0}\", params: /{1}/, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",regularExpressionAttribute.FormatErrorMessage(p.Name), regularExpressionAttribute.Pattern, p.Name));
                isValidatable = true;
            }

            UrlAttribute urlAttribute = p.GetCustomAttribute<UrlAttribute>();
            if (urlAttribute != null)
            {
                sb.Append(string.Format(".extend({ pattern: { message: \"{0}\", params: /{1}/, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",urlAttribute.FormatErrorMessage(p.Name), urlAttribute, p.Name));
                isValidatable = true;
            }

            DateAttribute dateAttribute = p.GetCustomAttribute<DateAttribute>();
            if (dateAttribute != null)
            {
                sb.Append(string.Format(".extend({ date: { message: \"{0}\", onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{1}\"); } } })",dateAttribute.FormatErrorMessage(p.Name), p.Name));
                isValidatable = true;
            }

            NumericAttribute numericAttribute = p.GetCustomAttribute<NumericAttribute>();
            if (numericAttribute != null)
            {
                sb.Append(
                    string.Format(".extend({ number: { message: \"{0}\", onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{1}\"); } } }).extend({ numeric: {2} })",
                        numericAttribute.FormatErrorMessage(p.Name), p.Name, numericAttribute.Precision));
                isValidatable = true;
            }

            EmailAttribute emailAttribute = p.GetCustomAttribute<EmailAttribute>();
            if (emailAttribute != null)
            {
                sb.Append(string.Format(".extend({ email: { message: \"{0}\", onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{1}\"); } } })",emailAttribute.FormatErrorMessage(p.Name), p.Name));
                isValidatable = true;
            }

            DigitsAttribute digitsAttribute = p.GetCustomAttribute<DigitsAttribute>();
            if (digitsAttribute != null)
            {
                sb.Append(string.Format(".extend({ digit: { message: \"{0}\", onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{1}\"); } } }).extend({ numeric: 0 })",digitsAttribute.FormatErrorMessage(p.Name), p.Name));
                isValidatable = true;
            }

            MinAttribute minAttribute = p.GetCustomAttribute<MinAttribute>();
            if (minAttribute != null)
            {
                sb.Append(string.Format(".extend({ min: { message: \"{0}\", params: {1}, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",minAttribute.FormatErrorMessage(p.Name), minAttribute.Min, p.Name));
                isValidatable = true;
            }

            MaxAttribute maxAttribute = p.GetCustomAttribute<MaxAttribute>();
            if (maxAttribute != null)
            {
                sb.Append(string.Format(".extend({ max: { message: \"{0}\", params: {1}, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",maxAttribute.FormatErrorMessage(p.Name), maxAttribute.Max, p.Name));
                isValidatable = true;
            }

            EqualToAttribute equalToAttribute = p.GetCustomAttribute<EqualToAttribute>();
            if (equalToAttribute != null)
            {
                sb.Append(string.Format(".extend({ equal: { message: \"{0}\", params: {1}, onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",equalToAttribute.FormatErrorMessage(p.Name), equalToAttribute.OtherProperty, p.Name));
                isValidatable = true;
            }

            CompareAttribute compareAttribute = p.GetCustomAttribute<CompareAttribute>();
            if (compareAttribute != null)
            {
                sb.Append(string.Format(".extend({ equal: { message: \"{0}\", params: \"{1}\", onlyIf: function() { return ko.utils.isPropertyValidatable(self, \"{2}\"); } } })",compareAttribute.FormatErrorMessage(p.Name), compareAttribute.OtherProperty, p.Name));
                isValidatable = true;
            }

            FormatterAttribute formatterAttribute = p.GetCustomAttribute<FormatterAttribute>();

            if (formatterAttribute != null)
            {
                sb.Append(string.Format(".formatted({0}, {1})",formatterAttribute.Formatter, JsonConvert.SerializeObject(formatterAttribute.Arguments)));
            }

            return sb.ToString();
        }

        private static void WriteEnumModel(Type type, IndentedTextWriter writer)
        {
            writer.WriteLine("var " + type.Name + " = [");
            int index = 1;

            writer.Indent++;
            var fields = type.GetFields(BindingFlags.Public | BindingFlags.Static);
            foreach (FieldInfo fieldInfo in fields)
            {
                DescriptionAttribute attribs =
                    (from attr in
                         fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false)
                     select attr).Cast<DescriptionAttribute>().FirstOrDefault();

                string description = null;
                if (attribs != null)
                {
                    description = attribs.Description;
                }
                if (string.IsNullOrWhiteSpace(description))
                {
                    description = fieldInfo.Name;
                }
                var constantValue = fieldInfo.GetRawConstantValue();
                writer.Write("{ Text: \"" + description + "\", Value: \""+ fieldInfo.Name + "\", NumericValue: "+ constantValue + " }");
                writer.WriteLine(index < fields.Length ? "," : string.Empty);
                index++;
            }

            writer.Indent--;
            writer.WriteLine("]");
            writer.WriteLine();
            writer.WriteLine();

            foreach (FieldInfo fieldInfo in fields)
            {
                DescriptionAttribute attribs =
            (from attr in
                 fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false)
             select attr).Cast<DescriptionAttribute>().FirstOrDefault();

                string description = null;
                if (attribs != null)
                {
                    description = attribs.Description;
                }
                if (string.IsNullOrWhiteSpace(description))
                {
                    description = fieldInfo.Name;
                }
                writer.WriteLine("" + type.Name + "." + fieldInfo.Name + " = { Text: \"" + description + "\", Value: " + fieldInfo.GetRawConstantValue() + " }");

            //    writer.WriteLine(string.Format("{0}.{1} = { Text: \"{2}\", Value: {3} };",type.Name, fieldInfo.Name, description, fieldInfo.GetRawConstantValue()));
            }

            writer.WriteLine();
            writer.WriteLine();
        }
    }
}

