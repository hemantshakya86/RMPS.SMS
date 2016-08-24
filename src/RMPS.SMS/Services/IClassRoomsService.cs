using System;
using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
    public interface IClassRoomsService
    {
        void SaveClassRoom(CoursesModel model);

        CoursesModel GetClassRooms(int id);

        void UpdateClassRooms(int id, CoursesModel model);

        IEnumerable<CoursesDetailsModel> GetClassRoomDetails(string className = null);
    }
}
