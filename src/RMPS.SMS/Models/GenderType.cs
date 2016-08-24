using System.ComponentModel;

namespace RMPS.SMS.Models
{
    public enum GenderType:byte
    {
        [Description("Male")]
        Male = 1,
        [Description("Female")]
        Female = 2,
    }
}
