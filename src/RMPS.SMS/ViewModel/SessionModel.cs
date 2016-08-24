using System;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class SessionModel
    {
        public int ID { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }


    }
}
