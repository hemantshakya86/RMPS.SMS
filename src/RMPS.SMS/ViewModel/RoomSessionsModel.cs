using System;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class RoomSessionsModel
    {
        //public Guid ID { get; set; }
        public int SessionID { get; set; }
        public int ClassID { get; set; }
        public int SectionID { get; set; }
        public int[] CourseID { get; set; }
    }
}
