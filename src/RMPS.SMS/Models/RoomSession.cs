using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class RoomSession
    {
        [Key]
        public int ID { get; set; }
        public int SessionID { get; set; }
        public int ClassID { get; set; }
        public int SectionID { get; set; }
        public int CourseID { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public virtual Session Session { get; set; }
        public virtual ClassRoom ClassRoom { get; set; }
        public virtual Section Section { get; set; }
        public virtual Course Course { get; set; }
        //public List<ClassSessionTeacher> ClassSessionTeacher { get; set; }
        public virtual ICollection<RoomFees> RoomFees { get; set; }
        public virtual ICollection<SessionStudent> SessionStudents { get; set; }

    }
}
