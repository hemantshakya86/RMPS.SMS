﻿using System;
using System.ComponentModel.DataAnnotations;

namespace RMPS.SMS.Models
{
    public class StudentFees
    {
        [Key]
        public int ID { get; set; }
        public int RoomFeeID { get; set; }
        public int StudentID { get; set; }
        public double AdmissionFee { get; set; }
        public double ExamFee { get; set; }
        public double TutionFee { get; set; }
        public double DevelopmentFee { get; set; }
        public double UniformFee { get; set; }
        public double StationaryFee { get; set; }
        public double OtherFee1 { get; set; }
        public double OtherFee2 { get; set; }
        public FeeModeType FeeMode { get; set; }
        public int TransactionID { get; set; }
    }
}
