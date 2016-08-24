using System.ComponentModel;

namespace RMPS.SMS.Models
{
    public enum AddressType : byte
    {
        [Description("Permanent")]
        Permanent = 1,
        [Description("Temperary")]
        Temperary = 2,
    }
}
