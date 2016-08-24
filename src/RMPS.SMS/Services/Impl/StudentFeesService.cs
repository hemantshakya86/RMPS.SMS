using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using RMPS.SMS.Data;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.Services.Impl
{
    public class StudentFeesService : IStudentFeesService
    {
        private readonly ApplicationDbContext dbContext;

        public StudentFeesService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IEnumerable<RoomFeesModel> GetAllClassFees()
        {
            var roomFees = dbContext.RoomFeess.ToList();
            var roomFeess = Mapper.Map<IEnumerable<RoomFees>, IEnumerable<RoomFeesModel>>(roomFees);
            return roomFeess;
        }

        public void SaveOnClassFees(RoomFeesModel model)
        {
            var session =
                dbContext.Sessions.FirstOrDefault(x => x.StartDate.Value.Date <= DateTime.Now.Date && x.EndDate.Value.Date >= DateTime.Now.Date);
            var roomSession = dbContext.RoomSessions.FirstOrDefault(x => x.SessionID == session.ID);
            model.RoomSessionID = roomSession.ID;
            var fees = Mapper.Map<RoomFeesModel, RoomFees>(model);
            dbContext.RoomFeess.Add(fees);
            dbContext.SaveChanges();
        }

        public RoomFeesModel GetOnClassFees(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateOnClassFees(int id, RoomFeesModel studentModel)
        {
            throw new NotImplementedException();
        }
    }
}
