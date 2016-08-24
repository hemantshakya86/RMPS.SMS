using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class Session
    {
        [Key]
        public int ID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual ICollection<RoomSession> RoomSessionses { get; set; }

    }
}
