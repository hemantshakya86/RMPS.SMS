using System;
using Microsoft.AspNetCore.Authentication;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class SessionDetailsModel
    {
        public int ID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Session { get; set; }

       
    }
}
