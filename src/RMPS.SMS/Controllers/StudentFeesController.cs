using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using RMPS.SMS.Data;
using RMPS.SMS.Models;

namespace RMPS.SMS.Controllers
{
    public class StudentFeesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StudentFeesController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: StudentFees
        public IActionResult Index()
        {
            return View();
        }

        [Route("createfees")]
        [Route("editfees/{id:int}")]
        public IActionResult CreateEditClassFees(int? id)
        {
            return View(id);
        }

        
       

        
    }
}
