using System;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class StudentDetailsModel
    {
        public StudentDetailsModel()
        {
            this.LocalAddress = new LocalAddressModel();
            this.PermanentAddress = new PermanentAddressModel();
        }
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Phone { get; set; }
        public string FatherQualification { get; set; }
        public string MotherQualification { get; set; }
      //  public GenderType Gender { get; set; }
        public string Email { get; set; }
        public DateTime DateOfJoining { get; set; }
        public string FatherOccupation { get; set; }
        public string Category { get; set; }
        public string Cast { get; set; }
        public string Religion { get; set; }
        public DateTime DateOfLeaving { get; set; }
        public LocalAddressModel LocalAddress { get; set; }
        public PermanentAddressModel PermanentAddress { get; set; }
    }
}
