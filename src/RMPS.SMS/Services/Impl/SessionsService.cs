using System;
using System.Collections.Generic;
using System.Linq;
using RMPS.SMS.Data;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.Services.Impl
{
    public class SessionsService : ISessionsService
    {
        private readonly ApplicationDbContext dbContext;

        public SessionsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public void SaveClassRooms(SessionModel model)
        {
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (model.StartDate == null)
            {
                throw new Exception("Please Enter Start Date");
            }
            if (model.EndDate ==null)
            {
                throw new Exception("Please Enter Last Date");
            }
            try
            {
                Session session = new Session();
                session.StartDate = model.StartDate;
                session.EndDate = model.EndDate;
                dbContext.Sessions.Add(session);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public SessionDetailsModel GetSession(int id)
        {
            SessionDetailsModel model = new SessionDetailsModel();
            try
            {
                Session session = dbContext.Sessions.FirstOrDefault(x => x.ID == id);
                if (session != null)
                {
                    model.StartDate = session.StartDate;
                    model.EndDate = session.EndDate;
                }
                else
                {
                    throw new ApiException("This Session does not exist");
                }
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
            return model;
        }

        public void UpdateSession(int id, SessionModel model)
        {
            try
            {
                if (model == null)
                {
                    throw new Exception("Invalid Session");
                }
                if (model.StartDate == null)
                {
                    throw new Exception("Please Enter Start Date");
                }
                if (model.EndDate == null)
                {
                    throw new Exception("Please Enter Last Date");
                }

                Session sessions = dbContext.Sessions.FirstOrDefault(x => x.ID == id);
                if (sessions != null)
                {
                    sessions.StartDate = model.StartDate;
                    sessions.EndDate = model.EndDate;
                    //dbContext.Sessions.Add(sessions);
                    dbContext.SaveChanges();
                }
                else
                {
                    throw new ApiException("This session does not exist");
                }
            }
            catch (Exception exception)
            {

                throw new ApiException(exception.Message);
            }
        }

        public IEnumerable<SessionDetailsModel> GetAllSessions(string startDate = null, string endDate = null)
        {
            IQueryable<Session> sessionsesQueryable = dbContext.Sessions.AsQueryable();

            if (!string.IsNullOrWhiteSpace(startDate))
            {
                //List<string> lists = StartDate.Split(new string[] { " " }, StringSplitOptions.RemoveEmptyEntries).ToList();
                //sessionsesQueryable =
                //    sessionsesQueryable.Where(
                //        z => lists.Any(y => z.StartDate.Contains(y.ToUpper()) || z.StartDate.Contains(y.ToLower())));
            }
            var sessionList = sessionsesQueryable.ToList().Select(session => new SessionDetailsModel()
            {
                ID = session.ID,
                StartDate = session.StartDate,
                EndDate = session.EndDate,
            });
            return sessionList;
        }
    }
}
