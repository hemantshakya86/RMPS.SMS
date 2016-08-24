using System.Collections.Generic;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS.Services
{
   public interface ISessionStudentService
   {
       void SaveSessionStudent(SessionStudentModel model,int id);
       IEnumerable<ClassRoomModel> GetAllClasses(int id);
   }
}
