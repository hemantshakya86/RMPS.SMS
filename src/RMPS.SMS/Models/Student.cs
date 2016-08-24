using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class Student 
    {
        [Key]
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Phone { get; set; }
        public string FatherQualification { get; set; }
        public string MotherQualification { get; set; }
        public GenderType Gender { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public string FatherOccupation { get; set; }
        public string Category { get; set; }
        public string Cast { get; set; }
        public string Religion { get; set; }
        public DateTime? DateOfLeaving { get; set; }
        public string ProfileImage { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }


    }
}
