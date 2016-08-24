using System.ComponentModel;

namespace RMPS.SMS.Models
{
    public enum FeeModeType : byte
    {
        [Description("Cash")]
        Cash = 1,
        [Description("Check")]
        Check = 2,
        [Description("Online")]
        Online = 3,
    }
}
