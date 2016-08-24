using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Data;
using RMPS.SMS.Data.Migrations;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Controllers
{
    [Route("roomsessions")]
    public class RoomSessionsController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public RoomSessionsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
      
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("createroomsessions")]
        [Route("editroomsessions/{id:int}")]
        public IActionResult CreateEditRoomSessions(int? id)
        {
          
            IQueryable<Session> queryableSessions = dbContext.Sessions.AsQueryable();
            IQueryable<ClassRoom> queryableClassroom = dbContext.ClassRooms.AsQueryable();
            var sectionsList = dbContext.Sections.Where(x => x.NoOfStudent == 1);
            IQueryable<Course> queryableCourses = dbContext.Courses.AsQueryable();

            var session = queryableSessions.Select(sessions => new
            {
                StartDate = sessions.StartDate,
                EndDate = sessions.EndDate,
                ID = sessions.ID

            }).OrderBy(x => x.StartDate).ToList().Select(x => new SessionDetailsModel()
            {
                StartDate = x.StartDate,
                EndDate = x.EndDate,
                Session = x.StartDate.Value.ToString("MM/yyyy") + "-" + x.EndDate.Value.ToString("MM/yyyy"),
                ID = x.ID
            }).ToList();
            var classroom = queryableClassroom.Select(classrooms => new ClassRoomModel()
            {
                Name = classrooms.Name,
                ID = classrooms.ID
            }).OrderBy(x => x.Name).ToList();

            var section = sectionsList.Select(sections => new ClassRoomModel()
            {
                Name = sections.Name,
                ID = sections.ID
            }).OrderBy(x => x.Name).ToList();
            var course = queryableCourses.Select(courses => new CoursesModel()
            {
                Name = courses.Name,
                ID = courses.ID
            }).OrderBy(x => x.Name).ToList();
            ViewBag.sessions = session;
            ViewBag.classrooms = classroom;
            // ViewBag.classrooms = classroom;
            ViewBag.sections = section;
            ViewBag.courses = course;
            return View(id);
        }

        [HttpGet]
        [Route("delete/{id:int}")]
        public IActionResult DeleteRoomSession(int id)
        {
            return View(id);
        }

    }
}