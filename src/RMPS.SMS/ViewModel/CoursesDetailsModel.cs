using System;
using System.ComponentModel.DataAnnotations;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class CoursesDetailsModel
    {
        public string CourseName { get; set; }

        public int ID { get; set; }
    }
}
