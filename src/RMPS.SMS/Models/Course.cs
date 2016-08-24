using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class Course
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
       // public int NoOfStudent { get; set; }
        public virtual ICollection<RoomSession> RoomSessionses { get; set; }
      
    }
}
