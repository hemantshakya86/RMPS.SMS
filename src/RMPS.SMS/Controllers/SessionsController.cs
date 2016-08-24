using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RMPS.SMS.Controllers
{
    [Route("sessions")]
    public class SessionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("createsession")]
        [Route("editsession/{id:int}")]
        public IActionResult CreateEditSessions(int? id)
        {
            return View(id);
        }
    }
}