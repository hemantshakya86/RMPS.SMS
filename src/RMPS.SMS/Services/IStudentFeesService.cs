using System;
using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
    public interface IStudentFeesService
    {
        IEnumerable<RoomFeesModel> GetAllClassFees();

        void SaveOnClassFees(RoomFeesModel model);

        RoomFeesModel GetOnClassFees(int id);

        void UpdateOnClassFees(int id, RoomFeesModel studentModel);
    }
}
