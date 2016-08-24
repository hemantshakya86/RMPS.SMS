using System;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class Address
    {
        [Key]
        public int ID { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string LandMark { get; set; }
        public string ZipCode { get; set; }
        public Guid UserID { get; set; }
        public int StudentID { get; set; }
        public int TeacherID { get; set; }

        public AddressType AddressType { get; set; }

        public virtual Student Student { get; set; }
        //public  Teacher Teacher { get; set; }
    }
}
