using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using RMPS.SMS.Data;

namespace RMPS.SMS.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20160730111645_Students")]
    partial class Students
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("RMPS.SMS.Models.Address", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<byte>("AddressType");

                    b.Property<string>("City");

                    b.Property<string>("HouseNumber");

                    b.Property<string>("LandMark");

                    b.Property<string>("State");

                    b.Property<string>("Street");

                    b.Property<int?>("StudentID");

                    b.Property<int?>("TeacherID");

                    b.Property<Guid>("UserID");

                    b.Property<string>("ZipCode");

                    b.HasKey("ID");

                    b.HasIndex("StudentID");

                    b.HasIndex("TeacherID");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("RMPS.SMS.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsLockedOut");

                    b.Property<bool>("IsSuspended");

                    b.Property<bool>("IsVerified");

                    b.Property<DateTime?>("LastActivityDate");

                    b.Property<DateTime?>("LastLockoutDate");

                    b.Property<DateTime?>("LastLoginDate");

                    b.Property<string>("LastName");

                    b.Property<DateTime?>("LastPasswordChangedDate");

                    b.Property<DateTime?>("LastPasswordFailureDate");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<int>("PasswordFailureSinceLastSuccess");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("RMPS.SMS.Models.ClassRoom", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("ClassRooms");
                });

            modelBuilder.Entity("RMPS.SMS.Models.ClassSessionTeacher", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<int?>("RoomSessionID");

                    b.Property<int>("RoomSessionsID");

                    b.Property<DateTime>("StartDate");

                    b.Property<int>("TeacherID");

                    b.HasKey("ID");

                    b.HasIndex("RoomSessionID");

                    b.HasIndex("TeacherID");

                    b.ToTable("ClassSessionTeachers");
                });

            modelBuilder.Entity("RMPS.SMS.Models.Course", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("RMPS.SMS.Models.RoomFees", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AdmissionFee");

                    b.Property<double>("DevelopmentFee");

                    b.Property<DateTime>("DueDate");

                    b.Property<double>("ExamFee");

                    b.Property<byte>("FeeType");

                    b.Property<double>("LateFee");

                    b.Property<double>("OtherFee1");

                    b.Property<double>("OtherFee2");

                    b.Property<int?>("RoomSessionID");

                    b.Property<int>("RoomSessionsID");

                    b.Property<double>("StationaryFee");

                    b.Property<double>("TutionFee");

                    b.Property<double>("UniformFee");

                    b.HasKey("ID");

                    b.HasIndex("RoomSessionID");

                    b.ToTable("RoomFeess");
                });

            modelBuilder.Entity("RMPS.SMS.Models.RoomSession", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClassID");

                    b.Property<int?>("ClassRoomID");

                    b.Property<int>("CourseID");

                    b.Property<DateTime?>("EndDate");

                    b.Property<int>("SectionID");

                    b.Property<int>("SessionID");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("ID");

                    b.HasIndex("ClassRoomID");

                    b.HasIndex("CourseID");

                    b.HasIndex("SectionID");

                    b.HasIndex("SessionID");

                    b.ToTable("RoomSessions");
                });

            modelBuilder.Entity("RMPS.SMS.Models.Section", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("NoOfStudent");

                    b.HasKey("ID");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("RMPS.SMS.Models.Session", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("ID");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("RMPS.SMS.Models.Student", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Cast");

                    b.Property<string>("Category");

                    b.Property<DateTime?>("DateOfBirth");

                    b.Property<DateTime?>("DateOfJoining");

                    b.Property<DateTime?>("DateOfLeaving");

                    b.Property<string>("Email");

                    b.Property<string>("FatherName");

                    b.Property<string>("FatherOccupation");

                    b.Property<string>("FatherQualification");

                    b.Property<string>("FirstName");

                    b.Property<byte>("Gender");

                    b.Property<string>("LastName");

                    b.Property<string>("MotherName");

                    b.Property<string>("MotherQualification");

                    b.Property<string>("Phone");

                    b.Property<string>("ProfileImage");

                    b.Property<string>("Religion");

                    b.HasKey("ID");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("RMPS.SMS.Models.StudentFees", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("AdmissionFee");

                    b.Property<double>("DevelopmentFee");

                    b.Property<double>("ExamFee");

                    b.Property<byte>("FeeMode");

                    b.Property<double>("OtherFee1");

                    b.Property<double>("OtherFee2");

                    b.Property<int>("RoomFeeID");

                    b.Property<double>("StationaryFee");

                    b.Property<int>("StudentID");

                    b.Property<int>("TransactionID");

                    b.Property<double>("TutionFee");

                    b.Property<double>("UniformFee");

                    b.HasKey("ID");

                    b.ToTable("StudentFees");
                });

            modelBuilder.Entity("RMPS.SMS.Models.Teacher", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DateOfBirth");

                    b.Property<DateTime?>("DateOfJoining");

                    b.Property<DateTime?>("DateOfLeaving");

                    b.Property<string>("FatherName");

                    b.Property<string>("FirstName");

                    b.Property<byte>("Gender");

                    b.Property<string>("LastName");

                    b.Property<string>("MotherName");

                    b.Property<string>("Phone");

                    b.Property<string>("ProfileImage");

                    b.Property<string>("Qualification");

                    b.HasKey("ID");

                    b.ToTable("Teacher");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("RMPS.SMS.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("RMPS.SMS.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RMPS.SMS.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RMPS.SMS.Models.Address", b =>
                {
                    b.HasOne("RMPS.SMS.Models.Student", "Student")
                        .WithMany("Addresses")
                        .HasForeignKey("StudentID");

                    b.HasOne("RMPS.SMS.Models.Teacher", "Teacher")
                        .WithMany("Addresses")
                        .HasForeignKey("TeacherID");
                });

            modelBuilder.Entity("RMPS.SMS.Models.ClassSessionTeacher", b =>
                {
                    b.HasOne("RMPS.SMS.Models.RoomSession", "RoomSession")
                        .WithMany("ClassSessionTeacher")
                        .HasForeignKey("RoomSessionID");

                    b.HasOne("RMPS.SMS.Models.Teacher", "Teacher")
                        .WithMany()
                        .HasForeignKey("TeacherID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("RMPS.SMS.Models.RoomFees", b =>
                {
                    b.HasOne("RMPS.SMS.Models.RoomSession", "RoomSession")
                        .WithMany("RoomFees")
                        .HasForeignKey("RoomSessionID");
                });

            modelBuilder.Entity("RMPS.SMS.Models.RoomSession", b =>
                {
                    b.HasOne("RMPS.SMS.Models.ClassRoom", "ClassRoom")
                        .WithMany("RoomSessions")
                        .HasForeignKey("ClassRoomID");

                    b.HasOne("RMPS.SMS.Models.Course", "Course")
                        .WithMany("RoomSessionses")
                        .HasForeignKey("CourseID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RMPS.SMS.Models.Section", "Section")
                        .WithMany("RoomSessionses")
                        .HasForeignKey("SectionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RMPS.SMS.Models.Session", "Session")
                        .WithMany("RoomSessionses")
                        .HasForeignKey("SessionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
