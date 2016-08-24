using System;
using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
    public interface IStudentService
    {
        IEnumerable<StudentDetailsModel> GetAllStudent(string firstname = null, string lastname = null,string email = null);

        void SaveStudent(StudentModel model);

        StudentModel GetStudent(int id);

        void UpdateStudent(int id, StudentModel studentModel);
    }
}
