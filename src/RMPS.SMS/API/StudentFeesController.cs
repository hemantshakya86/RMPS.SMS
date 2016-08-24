using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Services;
using RMPS.SMS.Services.Impl;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.API
{
    [Produces("application/json")]
    [Route("api/studentfees")]
    public class StudentFeesController : Controller
    {
        private readonly IStudentFeesService studentFeesService;
        public StudentFeesController(IStudentFeesService studentFeesService)
        {
            this.studentFeesService = studentFeesService;
        }
        [HttpGet]
        [Route("feesdetial")]
        public IEnumerable<RoomFeesModel> GetAllClassFees()
        {
            try
            {
                return studentFeesService.GetAllClassFees();
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
        [Route("feescreate")]
        public void SaveOnClassFees([FromBody]RoomFeesModel model)
        {
            try
            {
                studentFeesService.SaveOnClassFees(model);
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