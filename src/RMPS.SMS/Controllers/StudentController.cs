using System;
using Microsoft.AspNetCore.Mvc;

namespace RMPS.SMS.Controllers
{
    [Route("student")]
    public class StudentController : Controller
    {
        // GET: Admission
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("createstudent")]
        [Route("editstudent/{id:int}")]
        public IActionResult CreateEditStudent(int? id)
        {
            return View(id);
        }
    }
}