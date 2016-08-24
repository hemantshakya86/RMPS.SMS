using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
   
    public class ClassRoom 
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<RoomSession> RoomSessions  { get; set; }

    }
}
