using System;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class UserModel
    {
        public Guid ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
