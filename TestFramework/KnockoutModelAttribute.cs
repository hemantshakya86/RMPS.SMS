using System;

namespace TestFramework
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Enum, AllowMultiple = false, Inherited = false)]
    public class KnockoutModelAttribute : Attribute
    {
    }
}

