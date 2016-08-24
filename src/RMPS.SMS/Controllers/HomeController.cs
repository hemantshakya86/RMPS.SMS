using Microsoft.AspNetCore.Mvc;

namespace RMPS.SMS.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public IActionResult Index()
        {
            return View();
        }
    }
}