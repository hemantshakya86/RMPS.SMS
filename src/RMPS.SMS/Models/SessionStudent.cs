using System;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class SessionStudent
    {
        [Key]
        public int ID { get; set; }
        public int RoomSessionsID { get; set; }
        public int ClassID { get; set; }
        public int StudentID { get; set; }
        public virtual RoomSession RoomSession { get; set; }
    }
}
