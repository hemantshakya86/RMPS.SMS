using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Services;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.API
{
    [Produces("application/json")]
    [Route("api/sessions")]
    public class SessionsController : Controller
    {
        private readonly ISessionsService sessionsService;

        public SessionsController(ISessionsService sessionsService)
        {
            this.sessionsService = sessionsService;
        }

        [HttpPost]
        [Route("create")]
        public void SaveClassRooms([FromBody] SessionModel model)
        {
            try
            {
                sessionsService.SaveClassRooms(model);
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
        public SessionDetailsModel GetSession(int id)
        {
            try
            {
                return sessionsService.GetSession(id);
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
        [Route("update/{id:int}")]
        public void UpdateSession(int id, [FromBody] SessionModel model)
        {
            try
            {
                sessionsService.UpdateSession(id, model);
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
        public IEnumerable<SessionDetailsModel> GetAllSessions(string startDate = null, string endDate = null)
        {
            try
            {
                return sessionsService.GetAllSessions(startDate, endDate);
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
