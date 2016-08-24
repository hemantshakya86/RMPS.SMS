using System;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class ClassSessionTeacher
    {
        [Key]
        public int ID { get; set; }
        public int RoomSessionsID { get; set; }
        public int TeacherID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public RoomSession RoomSession { get; set; }
        public Teacher Teacher { get; set; }
        
    }
}
