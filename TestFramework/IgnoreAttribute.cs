using System;

namespace TestFramework
{
   [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class IgnoreAttribute : Attribute    {

    }
}
