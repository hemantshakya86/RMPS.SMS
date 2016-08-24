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
    [Route("api/classrooms")]
    public class ClassRoomsController : Controller
    {
        private readonly IClassRoomsService classRoomsService;
        public ClassRoomsController(IClassRoomsService classRoomsService)
        {
            this.classRoomsService = classRoomsService;
        }
        [HttpGet]
        [Route("search")]
        public IEnumerable<CoursesDetailsModel> GetClassRoomDetails(string className = null)
        {
            try
            {
                return classRoomsService.GetClassRoomDetails(className);
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
        public void SaveClassRooms([FromBody]CoursesModel model)
        {
            try
            {
                classRoomsService.SaveClassRoom(model);
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
        public CoursesModel GetClassRooms(int id)
        {
            try
            {
                return classRoomsService.GetClassRooms(id);
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
        public void UpdateClassRooms(int id, [FromBody]CoursesModel model)
        {
            try
            {
                classRoomsService.UpdateClassRooms(id, model);
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
