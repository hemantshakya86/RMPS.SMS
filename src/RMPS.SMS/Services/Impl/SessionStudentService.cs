using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Internal;
using RMPS.SMS.Data;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services.Impl
{
    public class SessionStudentService : ISessionStudentService
    {
        private readonly ApplicationDbContext dbContext;

        public SessionStudentService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public void SaveSessionStudent(SessionStudentModel model, int id)
        {
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (string.IsNullOrEmpty(model.RoomSessionsID.ToString()))
            {
                throw new Exception("please select Room Session.");
            }
            if (string.IsNullOrEmpty(model.StudentID.ToString()))
            {
                throw new Exception("Please select Student.");
            }

            try
            {
                SessionStudent sessionStudent =
                    dbContext.SessionStudents.FirstOrDefault(
                        x => x.StudentID == id && x.ClassID == model.ClassID && x.RoomSessionsID == model.RoomSessionsID);
                if (sessionStudent == null)
                {
                    sessionStudent = new SessionStudent();
                    sessionStudent.RoomSessionsID = model.RoomSessionsID;
                    sessionStudent.StudentID = id;
                    sessionStudent.ClassID = model.ClassID;
                    dbContext.SessionStudents.Add(sessionStudent);
                    dbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<ClassRoomModel> GetAllClasses(int id)
        {
            var classes = dbContext.RoomSessions.Where(x => x.SessionID == id).Select(x => new ClassRoomModel()
            {
                ID = x.ClassRoom.ID,
                Name = x.ClassRoom.Name
            });
            return classes;
        }
    }
}
