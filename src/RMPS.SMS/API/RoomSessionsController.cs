using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Services;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.API
{
    [Produces("application/json")]
    [Route("api/roomsessions")]
    public class RoomSessionsController : Controller
    {
        private readonly IRoomSessionsService roomSessionsService;

        public RoomSessionsController(IRoomSessionsService roomSessionsService)
        {
            this.roomSessionsService = roomSessionsService;
        }

        [HttpPost]
        [Route("create")]
        public void SaveRoomSessions([FromBody]RoomSessionsModel model)
        {
            try
            {
                roomSessionsService.SaveRoomSessions(model);
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
        public RoomSessionsModel GetRoomSessions(int id)
        {
            try
            {
                return roomSessionsService.GetRoomSessions(id);
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

        [HttpDelete]
        [HttpOptions]
        [Route("delete/{id:int}")]
        public void DeleteRoomSessions(int id)
        {
            try
            {
                roomSessionsService.DeleteRoomSessions(id);
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
        [Route("search")]
        public IEnumerable<RoomSessionsDetailsModel> GetAllRoomSessions(string startDate = null, string endDate = null)
        {
            try
            {
                return roomSessionsService.GetAllRoomSessions(startDate, endDate);
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
