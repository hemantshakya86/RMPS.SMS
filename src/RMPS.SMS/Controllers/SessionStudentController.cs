using System.Linq;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using RMPS.SMS.Data;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Controllers
{
    [Route("sessionstudent")]
    public class SessionStudentController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        public SessionStudentController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [Route("")]
        // GET: SessionStudent
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("createsessionstudent/{id:int}")]
        public IActionResult CreateEditSessionStudent(int id)
        {
            var roomSessions = dbContext.RoomSessions.Select(x => new
            {
                ID = x.Session.ID,
                ClassID = x.ClassID,
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
                RoomSessionStartDate = x.FirstOrDefault().RoomSessionStartDate
            });
            ViewBag.Sesssion = roomSessions;
            return View(id);
        }
    }
}