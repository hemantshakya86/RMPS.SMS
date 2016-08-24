using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.Extensibility.Implementation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RMPS.SMS.Data;
using RMPS.SMS.Services;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.API
{
    [Produces("application/json")]
    [Route("api/course")]
    public class CourseController : Controller
    {
        private readonly ICoursesService coursesService;
        public CourseController(ICoursesService coursesService)
        {
            this.coursesService = coursesService;
        }
        [HttpGet]
        [Route("search")]
        public IEnumerable<CoursesDetailsModel> GetCoursesDetails(string coursesName = null)

        {
            try
            {
                return coursesService.GetCoursesDetails(coursesName);
            }
            catch (ApiException)
            {
                throw;
            }
            catch (Exception exception)
            {
                throw new ApiException(exception.GetExceptionMessage());
            }
        }
        [HttpPost]
        [Route("create")]
        public void SaveCourses([FromBody]CoursesModel model)
        {
            try
            {
                coursesService.SaveCourses(model);
            }
            catch (ApiException)
            {
                throw;
            }
            catch (Exception exception)
            {
                throw new ApiException(exception.GetExceptionMessage());
            }
        }
        [HttpGet]
        [Route("edit/{id:int}")]
        public CoursesModel GetCourses(int id)
        {
            try
            {
               
                var items = JsonConvert.SerializeObject(coursesService.GetCourses(id));
                var courseModel = JsonConvert.DeserializeObject<CoursesModel>(items);
                return courseModel;
            }
            catch (ApiException)
            {
                throw;
            }
            catch (Exception exception)
            {
                throw new ApiException(exception.GetExceptionMessage());
            }
        }
        [HttpPut]
        [Route("update/{id:int}")]
        public void UpdateCourses(int id, [FromBody]CoursesModel model)
        {
            try
            {
                coursesService.UpdateCourses(id, model);
            }
            catch (ApiException)
            {
                throw;
            }
            catch (Exception exception)
            {
                throw new ApiException(exception.GetExceptionMessage());
            }
        }
    }
}