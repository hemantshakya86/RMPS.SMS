using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RMPS.SMS.Controllers
{
    [Route("classrooms")]
    public class ClassRoomsController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("createclassrooms")]
        [Route("editclassrooms/{id:int}")]
        public IActionResult CreateEditClassRooms(int? id)
        {
            return View(id);
        }
    }
}