using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RMPS.SMS.Controllers
{
    public class CoursesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("createcourses")]
        [Route("editcourses/{id:int}")]
        public IActionResult CreateEditCourses(int? id)
        {
            return View(id);
        }
    }
}