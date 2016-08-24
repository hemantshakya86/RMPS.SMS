using System;
using System.ComponentModel.DataAnnotations;
using RMPS.SMS.Models;
using TestFramework;

namespace RMPS.SMS.ViewModel
{
    [KnockoutModel]
    public class RoomFeesModel
    {
        
        public int RoomSessionID { get; set; }
        public int? ID { get; set; }
        public double AdmissionFee { get; set; }
        public double ExamFee { get; set; }
        public double TutionFee { get; set; }
        public double DevelopmentFee { get; set; }
        public double UniformFee { get; set; }
        public double StationaryFee { get; set; }
        public double OtherFee1 { get; set; }
        public double OtherFee2 { get; set; }
        public DateTime? DueDate { get; set; }
        

        
    }
}
