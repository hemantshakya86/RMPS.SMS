using System;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class Staff
    {

        [Key]
        public int ID { get; set; }
        public string EmployeeCode { get; set; }
        public DateTime DateOfJoining { get; set; }
        public DateTime DateOfLeaving { get; set; }
    }
}
