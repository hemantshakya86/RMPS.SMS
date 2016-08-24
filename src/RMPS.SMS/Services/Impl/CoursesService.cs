using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RMPS.SMS.Data;
using RMPS.SMS.Data.Migrations;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.Services.Impl
{

    public class CoursesService : ICoursesService
    {
        private readonly ApplicationDbContext dbContext;

        public CoursesService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public void SaveCourses(CoursesModel model)
        {
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Please Enter Name");
            }
            try
            {
                Course course = new Course();
                course.Name = model.Name;
                dbContext.Courses.Add(course);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CoursesModel GetCourses(int id)
        {
            CoursesModel model = new CoursesModel();
            try
            {

                var course = dbContext.Courses.FirstOrDefault(x => x.ID == id);
                if (course != null)
                {
                    model.Name = course.Name;

                }
                else
                {
                    throw new ApiException("This Courses does not exist");
                }
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
            return model;
        }

        public void UpdateCourses(int id, CoursesModel model)
        {
            Course course = dbContext.Courses.FirstOrDefault(x => x.ID == id);
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Please Enter Name");
            }
            try
            {
                course.Name = model.Name;
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<CoursesDetailsModel> GetCoursesDetails(string courseName = null)
        {
            var queryable = dbContext.Courses.AsQueryable();
            var courses = queryable.Select(x => new
            {
                Name = x.Name,
                ID = x.ID

            }).Select(x => new CoursesDetailsModel()
            {
                CourseName = x.Name,
                ID = x.ID

            }).ToList();

            return courses;
        }
    }
}
