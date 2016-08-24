using System;
using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
   public interface ISessionsService
   {
       void SaveClassRooms(SessionModel model);

       SessionDetailsModel GetSession(int id);

       void UpdateSession(int id, SessionModel model);

       IEnumerable<SessionDetailsModel> GetAllSessions(string startDate = null, string endDate = null);
   }
}
