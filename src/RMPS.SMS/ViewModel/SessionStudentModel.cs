using System;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class SessionStudentModel
    {
        public int RoomSessionsID { get; set; }

        public int ClassID { get; set; }
        public int StudentID { get; set; }

    }
}
