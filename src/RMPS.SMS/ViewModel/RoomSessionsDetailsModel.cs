using System;
using System.Collections.Generic;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class RoomSessionsDetailsModel
    {
        public int ID { get; set; }
        public string Session { get; set; }
        public string Class { get; set; }
        public string Section { get; set; }
        public IEnumerable<string> Course { get; set; }
        public DateTime? RoomSessionStartDate { get; set; }
        public DateTime? RoomSessionEndDate { get; set; }
        //public string Section { get; set; }
    }
}
