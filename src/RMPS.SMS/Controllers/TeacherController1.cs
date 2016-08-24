using System;
using Microsoft.AspNetCore.Mvc;

namespace RMPS.SMS.Controllers
{
    [Route("teacher")]
    public class TeacherController1 : Controller
    {
        // GET: Teacher
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("createteacher")]
        [Route("editteacher/{id:guid}")]
        public IActionResult CreateEditTeacher(Guid? id)
        {
            return View(id);
        }

    }
}