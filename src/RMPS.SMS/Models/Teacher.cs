using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class Teacher
    {
        [Key]
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Phone { get; set; }
        public DateTime? DateOfJoining { get; set; }
        public DateTime? DateOfLeaving { get; set; }
        public string Qualification { get; set; }
        public GenderType Gender { get; set; }
        public string ProfileImage { get; set; }

        //public  List<Address> Addresses { get; set; }

    }
}
