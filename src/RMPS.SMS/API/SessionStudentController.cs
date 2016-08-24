using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Services;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.API
{
    [Produces("application/json")]
    [Route("api/sessionstudent")]
    public class SessionStudentController : Controller
    {
        private readonly ISessionStudentService sessionStudentService;

        public SessionStudentController(ISessionStudentService sessionStudentService)
        {
            this.sessionStudentService = sessionStudentService;
        }

        [HttpPost]
        [Route("create/{id:int}")]
        public void SaveSessionStudent([FromBody]SessionStudentModel model,int id)
        {
            try
            {
                sessionStudentService.SaveSessionStudent(model,id);
            }
            catch (ApiException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.GetExceptionMessage());
            }
        }
        [HttpGet]
        [Route("classes/{id:int}")]
        public IEnumerable<ClassRoomModel> GetAllClasses(int id)
        {
            try
            {
                return sessionStudentService.GetAllClasses(id);
            }
            catch (ApiException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new ApiException(ex.GetExceptionMessage());
            }
        }
    }
}
