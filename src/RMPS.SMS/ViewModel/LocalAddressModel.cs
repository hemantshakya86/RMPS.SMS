using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class LocalAddressModel
    {
        
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string LandMark { get; set; }

    }
}
