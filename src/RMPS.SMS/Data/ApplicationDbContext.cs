using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RMPS.SMS.Models;

namespace RMPS.SMS.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        /* public ApplicationDbContext(DbContextOptions options)
             : base(options)
         {

         }*/


        public DbSet<Course> Courses { get; set; }
        public DbSet<RoomSession> RoomSessions { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<ClassRoom> ClassRooms { get; set; }
        public DbSet<ClassSessionTeacher> ClassSessionTeachers { get; set; }
        public DbSet<RoomFees> RoomFeess { get; set; }
        public DbSet<SessionStudent> SessionStudents { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<StudentFees> StudentFees { get; set; }
        public DbSet<Student> Students { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<Course>().HasMany(x => x.RoomSessionses).WithOne(x => x.Course).HasForeignKey(x=>x.CourseID);
            builder.Entity<Section>().HasMany(x => x.RoomSessionses).WithOne(x => x.Section).HasForeignKey(x => x.SectionID); 
            builder.Entity<Session>().HasMany(x => x.RoomSessionses).WithOne(x => x.Session).HasForeignKey(x => x.SessionID); 
            builder.Entity<ClassRoom>().HasMany(x => x.RoomSessions).WithOne(x => x.ClassRoom).HasForeignKey(x => x.ClassID); 
            //builder.Entity<RoomSession>().HasMany(x => x.ClassSessionTeacher).WithOne(x => x.RoomSession);
            builder.Entity<RoomSession>().HasMany(x => x.RoomFees).WithOne(x => x.RoomSession).HasForeignKey(x=>x.RoomSessionID);
            builder.Entity<RoomSession>().HasMany(x => x.SessionStudents).WithOne(x => x.RoomSession).HasForeignKey(x=>x.RoomSessionsID);
            builder.Entity<Student>().HasMany(x => x.Addresses).WithOne(x => x.Student).HasForeignKey(x=>x.StudentID);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=10.0.0.6;Database=RMPSSMS;user id=dbuser;password=password11;Trusted_Connection=True;MultipleActiveResultSets=true");
        }

        public virtual DbSet<T> CreateSet<T>()
          where T : class
        {
            return Set<T>();
        }
    }
}
