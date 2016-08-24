using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace RMPS.SMS.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsVerified { get; set; }

        public int PasswordFailureSinceLastSuccess { get; set; }

        public DateTime? LastPasswordFailureDate { get; set; }

        public DateTime? LastActivityDate { get; set; }

        public DateTime? LastLockoutDate { get; set; }

        public DateTime? LastLoginDate { get; set; }

        public bool IsLockedOut { get; set; }

        public bool IsSuspended { get; set; }

        public DateTime? LastPasswordChangedDate { get; set; }

      
    }
}
