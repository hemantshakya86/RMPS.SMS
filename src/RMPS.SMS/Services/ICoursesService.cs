using System;
using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
    public interface ICoursesService
    {
        void SaveCourses(CoursesModel model);

        CoursesModel GetCourses(int id);

        void UpdateCourses(int id, CoursesModel model);

       IEnumerable<CoursesDetailsModel> GetCoursesDetails(string coursesName = null);
    }
}
