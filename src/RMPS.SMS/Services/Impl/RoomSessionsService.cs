using System;
using System.Collections.Generic;
using System.Linq;
using RMPS.SMS.Data;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.Services.Impl
{
    public class RoomSessionsService : IRoomSessionsService
    {
        private readonly ApplicationDbContext dbContext;
        public RoomSessionsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void SaveRoomSessions(RoomSessionsModel model)
        {
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (string.IsNullOrEmpty(model.SessionID.ToString()))
            {
                throw new Exception("Please Select Session");
            }
            if (string.IsNullOrEmpty(model.ClassID.ToString()))
            {
                throw new Exception("Please Select Class");
            }
            if (string.IsNullOrEmpty(model.SectionID.ToString()))
            {
                throw new Exception("Please Select Section");
            }
            if (string.IsNullOrEmpty(model.CourseID.ToString()))
            {
                throw new Exception("Please Select Course");
            }
            try
            {
                foreach (var course in model.CourseID)
                {
                    RoomSession roomSessions = new RoomSession();
                    roomSessions.SessionID = model.SessionID;
                    roomSessions.ClassID = model.ClassID;
                    roomSessions.SectionID = model.SectionID;
                    roomSessions.CourseID = course;
                    roomSessions.StartDate = DateTime.Now;
                    dbContext.RoomSessions.Add(roomSessions);
                }
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public RoomSessionsModel GetRoomSessions(int id)
        {
            RoomSessionsModel model = new RoomSessionsModel();
            try
            {
                RoomSession roomSessions = dbContext.RoomSessions.FirstOrDefault(x => x.SectionID == id);

                try
                {
                    model.SessionID = roomSessions.SessionID;
                    model.ClassID = roomSessions.ClassID;
                    model.SectionID = roomSessions.SectionID;
                    //model.CourseID = roomSessions.CourseID;
                    dbContext.SaveChanges();
                }
                catch
                {
                    throw new ApiException("This room session does not exist");
                }
            }
            catch (Exception exception)
            {

                throw new Exception(exception.Message);
            }
            return model;
        }

        public void DeleteRoomSessions(int id)
        {
            var roomSessions = dbContext.RoomSessions.Where(x => x.SessionID == id);
            foreach (var sessionRoom in roomSessions)
            {
                dbContext.RoomSessions.Remove(sessionRoom);
            }
            dbContext.SaveChanges();

        }


        public IEnumerable<RoomSessionsDetailsModel> GetAllRoomSessions(string startDate = null, string endDate = null)
        {


            var roomSessions = dbContext.RoomSessions.Select(x => new
            {
                ID = x.Session.ID,
                ClassID=x.ClassID,
                SessionStartDate = x.Session.StartDate,
                SessionEndDate = x.Session.EndDate,
                Class = x.ClassRoom.Name,
                Section = x.Section.Name,
                Course = x.Course.Name,
                RoomSessionStartDate = x.StartDate,
            })
            .ToList().GroupBy(x => x.ClassID).Select(x => new RoomSessionsDetailsModel()
            {
                ID = x.FirstOrDefault().ID,
                Session = x.FirstOrDefault().SessionStartDate.Value.ToString("MM/yyyy") + "-" + x.FirstOrDefault().SessionEndDate.Value.ToString("MM/yyyy"),
                Class = x.FirstOrDefault().Class,
                Section = x.FirstOrDefault().Section,
                Course = x.Select(s => s.Course),
                RoomSessionStartDate = x.FirstOrDefault().RoomSessionStartDate
            });

            return roomSessions;
        }
    }
}
