using System;
using System.Collections.Generic;
using System.Linq;
using RMPS.SMS.Data;
using RMPS.SMS.Models;
using RMPS.SMS.ViewModel;
using TestFramework;

namespace RMPS.SMS.Services.Impl
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext dbContext;

        public StudentService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void SaveStudent(StudentModel model)
        {
            if (model == null)
            {
                throw new Exception("Invalid Value");
            }
            if (model.DateOfJoining==null)
            {
                throw new Exception("Please enter Date of Joining");
            }
           
            if (model.DateOfBirth==null)
            {
                throw new Exception("Please enter Date of birth");
            }
            if (string.IsNullOrEmpty(model.FirstName))
            {
                throw new Exception("Please enter First Name");
            }
            if (string.IsNullOrEmpty(model.LastName))
            {
                throw new Exception("Please enter Last Name");
            }
            if (string.IsNullOrEmpty(model.FatherName))
            {
                throw new Exception("Please enter Father Name");
            }
            if (string.IsNullOrEmpty(model.MotherName))
            {
                throw new Exception("Please enter Mother Name");
            }
            if (string.IsNullOrEmpty(model.FatherQualification))
            {
                throw new Exception("Please enter Father Qualification");
            }
            if (string.IsNullOrEmpty(model.MotherQualification))
            {
                throw new Exception("Please enter Mother Qualification");
            }
            if (string.IsNullOrEmpty(model.FatherOccupation))
            {
                throw new Exception("Please enter Father Occupation");
            }
            //if (string.IsNullOrEmpty(model.Gender))
            //{
            //    throw new Exception("Please select Gender");
            //}
            if (string.IsNullOrEmpty(model.Category))
            {
                throw new Exception("Please select Category");
            }
            if (string.IsNullOrEmpty(model.Cast))
            {
                throw new Exception("Please select Cast");
            }
            if (string.IsNullOrEmpty(model.Religion))
            {
                throw new Exception("Please select Religion");
            }

            try
            {

                var student = dbContext.Students.FirstOrDefault(x => x.Email == model.Email);

                if (!dbContext.Students.Any(x => x.Email == model.Email))
                {
                    Student u = new Student();
                    u.FirstName = model.FirstName;
                    u.LastName = model.LastName;
                    u.Phone = model.Phone;
                    u.DateOfJoining = model.DateOfJoining;
                    u.DateOfLeaving = model.DateOfLeaving;
                    u.FatherName = model.FatherName;
                    u.MotherName = model.MotherName;
                    u.Email = model.Email;
                    u.DateOfBirth = model.DateOfBirth;
                    u.Cast = model.Cast;
                    u.Category = model.Category;
                    u.FatherOccupation = model.FatherOccupation;
                    u.FatherQualification = model.FatherQualification;
                    u.MotherQualification = model.MotherQualification;
                    u.Religion = model.Religion;
                    u.Gender = model.Gender;
                    dbContext.Students.Add(u);
                    dbContext.SaveChanges();

                    Address localAddress = new Address();
                    localAddress.City = model.LocalAddress.City;
                    localAddress.State = model.LocalAddress.State;
                    localAddress.ZipCode = model.LocalAddress.ZipCode;
                    localAddress.AddressType = AddressType.Temperary;
                    localAddress.StudentID = u.ID;
                    localAddress.Street = model.LocalAddress.Street;
                    localAddress.LandMark = model.LocalAddress.LandMark;
                    localAddress.HouseNumber = model.LocalAddress.HouseNumber;
                    dbContext.Address.Add(localAddress);
                    Address permanentAddress = new Address();
                    permanentAddress.City = model.PermanentAddress.City;
                    permanentAddress.State = model.PermanentAddress.State;
                    permanentAddress.ZipCode = model.PermanentAddress.ZipCode;
                    permanentAddress.AddressType = AddressType.Permanent;
                    permanentAddress.StudentID = u.ID;
                    permanentAddress.Street = model.PermanentAddress.Street;
                    permanentAddress.LandMark = model.PermanentAddress.LandMark;
                    permanentAddress.HouseNumber = model.PermanentAddress.HouseNumber;
                    dbContext.Address.Add(permanentAddress);
                    dbContext.SaveChanges();
                }

                else
                {
                    throw new ApiException("User already exists. Please try another email.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public IEnumerable<StudentDetailsModel> GetAllStudent(string firstname = null, string lastname = null, string email = null)
        {
            IQueryable<Student> studentQueryable = dbContext.Students.AsQueryable();

            if (!string.IsNullOrWhiteSpace(firstname))
            {
                List<string> lists = firstname.Split(new string[] { " " }, StringSplitOptions.RemoveEmptyEntries).ToList();
                studentQueryable =
                    studentQueryable.Where(
                        z => lists.Any(y => z.FirstName.Contains(y.ToUpper()) || z.FirstName.Contains(y.ToLower())));
            }
            var studentList = from student in studentQueryable.ToList()
                              select new StudentDetailsModel()
                              {
                                  FirstName = student.FirstName,
                                  ID = student.ID,
                                  LastName = student.LastName,
                                  Email = student.Email
                              };
            return studentList;
        }

        public StudentModel GetStudent(int id)
        {
            StudentModel model = new StudentModel();
            LocalAddressModel localAddress = new LocalAddressModel();
            PermanentAddressModel permanentAddress = new PermanentAddressModel();
            Student student = dbContext.Students.FirstOrDefault(x => x.ID == id);
            if (student != null)
            {
                model.FirstName = student.FirstName;
                model.LastName = student.LastName;
                model.DateOfBirth = student.DateOfBirth;
                model.FatherName = student.FatherName;
                model.MotherName = student.MotherName;
                model.FatherQualification = student.FatherQualification;
                model.MotherQualification = student.MotherQualification;
                model.FatherOccupation = student.FatherOccupation;
                model.Gender = student.Gender;
                model.Phone = student.Phone;
                model.Email = student.Email;
                model.DateOfJoining = student.DateOfJoining;
                model.DateOfLeaving = student.DateOfLeaving;
                model.Category = student.Category;
                model.Cast = student.Cast;
                model.Religion = student.Religion;

                var permanentAdd = dbContext.Address.FirstOrDefault(x => x.StudentID == id && x.AddressType == AddressType.Permanent);
                if (permanentAdd != null)
                {
                    permanentAddress.HouseNumber = permanentAdd.HouseNumber;
                    permanentAddress.Street = permanentAdd.Street;
                    permanentAddress.City = permanentAdd.City;
                    permanentAddress.State = permanentAdd.State;
                    permanentAddress.ZipCode = permanentAdd.ZipCode;
                    permanentAddress.LandMark = permanentAdd.LandMark;
                }
                var localAdd = dbContext.Address.FirstOrDefault(x => x.StudentID == id && x.AddressType == AddressType.Temperary);
                if (localAdd != null)
                {
                    localAddress.HouseNumber = localAdd.HouseNumber;
                    localAddress.Street = localAdd.Street;
                    localAddress.City = localAdd.City;
                    localAddress.State = localAdd.State;
                    localAddress.ZipCode = localAdd.ZipCode;
                    localAddress.LandMark = localAdd.LandMark;
                }
            }
            else
            {
                throw new ApiException("This user does not exists.");
            }
            model.LocalAddress = localAddress;
            model.PermanentAddress = permanentAddress;
            return model;
        }

        public void UpdateStudent(int id, StudentModel model)
        {
            try
            {
                if (model == null)
                {
                    throw new Exception("Invalid Value");
                }
                if (string.IsNullOrEmpty(model.FirstName))
                {
                    throw new Exception("please Enter First Name");
                }
                if (string.IsNullOrEmpty(model.LastName))
                {
                    throw new Exception("Please enter Last Name");
                }
                if (model.DateOfBirth==null)
                {
                    throw new Exception("Please enter Date of birth");
                }
                if (string.IsNullOrEmpty(model.FatherName))
                {
                    throw new Exception("Please enter Father Name");
                }
                if (string.IsNullOrEmpty(model.MotherName))
                {
                    throw new Exception("Please enter Mother Name");
                }
                if (string.IsNullOrEmpty(model.FatherQualification))
                {
                    throw new Exception("Please enter Father Qualification");
                }
                if (string.IsNullOrEmpty(model.MotherQualification))
                {
                    throw new Exception("Please enter Mother Qualification");
                }
                if (string.IsNullOrEmpty(model.FatherOccupation))
                {
                    throw new Exception("Please enter Father Occupation");
                }
                if (string.IsNullOrEmpty(model.Phone))
                {
                    throw new Exception("Please enter Contact No.");
                }
                //if (string.IsNullOrEmpty(studentModel.Gender))
                //{
                //    throw new Exception("Please select Gender");
                //}
                if (string.IsNullOrEmpty(model.Email))
                {
                    throw new Exception("Please enter Email ID");
                }
                if (model.LocalAddress == null)
                {
                    throw new Exception("Please enter Local Address");
                }
                if (model.PermanentAddress == null)
                {
                    throw new Exception("Please enter Permanent Address");
                }
                if (model.DateOfJoining==null)
                {
                    throw new Exception("Please enter Date of Joining");
                }
                if (string.IsNullOrEmpty(model.Category))
                {
                    throw new Exception("Please select Category");
                }
                if (string.IsNullOrEmpty(model.Cast))
                {
                    throw new Exception("Please select Cast");
                }
                if (string.IsNullOrEmpty(model.Religion))
                {
                    throw new Exception("Please select Religion");
                }
                Student student = dbContext.Students.FirstOrDefault(x => x.ID == id);
                if (student != null)
                {
                    student.FirstName = model.FirstName;
                    student.LastName = model.LastName;
                    student.DateOfBirth = model.DateOfBirth;
                    student.FatherName = model.FatherName;
                    student.MotherName = model.MotherName;
                    student.FatherQualification = model.FatherQualification;
                    student.MotherQualification = model.MotherQualification;
                    student.FatherOccupation = model.FatherOccupation;
                    student.Gender = model.Gender;
                    student.DateOfJoining = model.DateOfJoining;
                    student.DateOfLeaving = model.DateOfLeaving;
                    student.Email = model.Email;
                    student.Category = model.Category;
                    student.Cast = model.Cast;
                    student.Religion = model.Religion;
                    dbContext.SaveChanges();
                }
                LocalAddressModel localAddress = model.LocalAddress;
                //PermanentAddressModel permanentAddress = new PermanentAddressModel();
                var address = dbContext.Address.FirstOrDefault(x => x.StudentID == id);
                address.City = localAddress.City;
                address.State = localAddress.State;
                address.ZipCode = localAddress.ZipCode;
                address.AddressType = AddressType.Temperary;
                address.Street = localAddress.Street;
                address.LandMark = localAddress.LandMark;
                address.HouseNumber = localAddress.HouseNumber;
                PermanentAddressModel permanentAddress = model.PermanentAddress;
                address.City = permanentAddress.City;
                address.State = permanentAddress.State;
                address.ZipCode = permanentAddress.ZipCode;
                address.AddressType = AddressType.Permanent;
                address.Street = permanentAddress.Street;
                address.LandMark = permanentAddress.LandMark;
                address.HouseNumber = permanentAddress.HouseNumber;
                dbContext.SaveChanges();
            }

            catch (Exception exception)
            {
                throw new ApiException(exception.Message);
            }

        }
    }
}
