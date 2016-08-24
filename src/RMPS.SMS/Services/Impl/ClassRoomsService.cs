using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Data;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.Services.Impl
{
    public class ClassRoomsService : IClassRoomsService
    {
        private readonly IUnitOfWork unitOfWork;

        public ClassRoomsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
        public void SaveClassRoom([FromBody]CoursesModel model)
        {
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Please Enter Name");
            }
            try
            {
                IRepository<ClassRoom> classRepository = unitOfWork.Get<ClassRoom>();
                ClassRoom classRoom = new ClassRoom();
                classRoom.Name = model.Name;
                classRepository.Save(classRoom);
                unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CoursesModel GetClassRooms(int id)
        {
            IRepository<ClassRoom> classRepository = unitOfWork.Get<ClassRoom>();
            CoursesModel model = new CoursesModel();
            try
            {
                ClassRoom classRoom = classRepository.One(x=>x.ID==id);
                if (classRoom != null)
                {
                    model.Name = classRoom.Name;
                  
                }
                else
                {
                    throw new ApiException("This Classroom does not exist");
                }
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
            return model;
        }

        public void UpdateClassRooms(int id, [FromBody]CoursesModel model)
        {
            IRepository<ClassRoom> classRepository = unitOfWork.Get<ClassRoom>();
            ClassRoom classRoom = classRepository.One(x => x.ID == id);
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                throw new Exception("Please Enter Name");
            }
            try
            {
                classRoom.Name = model.Name;
                unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<CoursesDetailsModel> GetClassRoomDetails(string className = null)
        {
            IRepository<ClassRoom> classRepository = unitOfWork.Get<ClassRoom>();
            var queryable = classRepository.Query;

            var classRooms = queryable.ToList().Select(x => new CoursesDetailsModel()
            {
                ID = x.ID,
                CourseName = x.Name
            });
            return classRooms;
        }
    }
}
