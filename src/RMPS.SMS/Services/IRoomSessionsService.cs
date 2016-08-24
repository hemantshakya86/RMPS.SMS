using System;
using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
    public interface IRoomSessionsService
    {
        void SaveRoomSessions(RoomSessionsModel model);

        RoomSessionsModel GetRoomSessions(int id);

        void DeleteRoomSessions(int id);

        IEnumerable<RoomSessionsDetailsModel> GetAllRoomSessions(string startDate = null, string endDate = null);
    }
}
