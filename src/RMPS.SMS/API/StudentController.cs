using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Services;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.API
{
    [Produces("application/json")]
    [Route("api/student")]
    public class StudentController : Controller
    {
        private readonly IStudentService studentService;

        public StudentController(IStudentService studentService)
        {
            this.studentService = studentService;
        }

        [HttpGet]
        [HttpOptions]
        [Route("search")]
        public IEnumerable<StudentDetailsModel> GetAllUsers(string firstName = null, string lastName = null, string email = null)
        {
            try
            {
                return studentService.GetAllStudent(firstName, lastName, email);
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
        public void SaveStudent([FromBody]StudentModel model)
        {
            try
            {
                studentService.SaveStudent(model);
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
        [HttpOptions]
        [Route("edit/{id:int}")]
        public StudentModel GetStudent(int id)
        {
            try
            {
                return studentService.GetStudent(id);
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
        [HttpOptions]
        [Route("editStudent/{id:int}")]
        public void UpdateStudent(int id, [FromBody]StudentModel studentModel)
        {
            try
            {
                studentService.UpdateStudent(id, studentModel);
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
