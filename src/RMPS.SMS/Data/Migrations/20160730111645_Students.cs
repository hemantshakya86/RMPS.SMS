using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RMPS.SMS.Data.Migrations
{
    public partial class Students : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoomFeess",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdmissionFee = table.Column<double>(nullable: false),
                    DevelopmentFee = table.Column<double>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false),
                    ExamFee = table.Column<double>(nullable: false),
                    FeeType = table.Column<byte>(nullable: false),
                    LateFee = table.Column<double>(nullable: false),
                    OtherFee1 = table.Column<double>(nullable: false),
                    OtherFee2 = table.Column<double>(nullable: false),
                    RoomSessionID = table.Column<int>(nullable: true),
                    RoomSessionsID = table.Column<int>(nullable: false),
                    StationaryFee = table.Column<double>(nullable: false),
                    TutionFee = table.Column<double>(nullable: false),
                    UniformFee = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomFeess", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RoomFeess_RoomSessions_RoomSessionID",
                        column: x => x.RoomSessionID,
                        principalTable: "RoomSessions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Cast = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: true),
                    DateOfJoining = table.Column<DateTime>(nullable: true),
                    DateOfLeaving = table.Column<DateTime>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    FatherName = table.Column<string>(nullable: true),
                    FatherOccupation = table.Column<string>(nullable: true),
                    FatherQualification = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    Gender = table.Column<byte>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    MotherName = table.Column<string>(nullable: true),
                    MotherQualification = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    ProfileImage = table.Column<string>(nullable: true),
                    Religion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "StudentFees",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdmissionFee = table.Column<double>(nullable: false),
                    DevelopmentFee = table.Column<double>(nullable: false),
                    ExamFee = table.Column<double>(nullable: false),
                    FeeMode = table.Column<byte>(nullable: false),
                    OtherFee1 = table.Column<double>(nullable: false),
                    OtherFee2 = table.Column<double>(nullable: false),
                    RoomFeeID = table.Column<int>(nullable: false),
                    StationaryFee = table.Column<double>(nullable: false),
                    StudentID = table.Column<int>(nullable: false),
                    TransactionID = table.Column<int>(nullable: false),
                    TutionFee = table.Column<double>(nullable: false),
                    UniformFee = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentFees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Teacher",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateOfBirth = table.Column<DateTime>(nullable: true),
                    DateOfJoining = table.Column<DateTime>(nullable: true),
                    DateOfLeaving = table.Column<DateTime>(nullable: true),
                    FatherName = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    Gender = table.Column<byte>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    MotherName = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    ProfileImage = table.Column<string>(nullable: true),
                    Qualification = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AddressType = table.Column<byte>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    HouseNumber = table.Column<string>(nullable: true),
                    LandMark = table.Column<string>(nullable: true),
                    State = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    StudentID = table.Column<int>(nullable: true),
                    TeacherID = table.Column<int>(nullable: true),
                    UserID = table.Column<Guid>(nullable: false),
                    ZipCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Address_Students_StudentID",
                        column: x => x.StudentID,
                        principalTable: "Students",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Address_Teacher_TeacherID",
                        column: x => x.TeacherID,
                        principalTable: "Teacher",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClassSessionTeachers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EndDate = table.Column<DateTime>(nullable: false),
                    RoomSessionID = table.Column<int>(nullable: true),
                    RoomSessionsID = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    TeacherID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassSessionTeachers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ClassSessionTeachers_RoomSessions_RoomSessionID",
                        column: x => x.RoomSessionID,
                        principalTable: "RoomSessions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClassSessionTeachers_Teacher_TeacherID",
                        column: x => x.TeacherID,
                        principalTable: "Teacher",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Address_StudentID",
                table: "Address",
                column: "StudentID");

            migrationBuilder.CreateIndex(
                name: "IX_Address_TeacherID",
                table: "Address",
                column: "TeacherID");

            migrationBuilder.CreateIndex(
                name: "IX_ClassSessionTeachers_RoomSessionID",
                table: "ClassSessionTeachers",
                column: "RoomSessionID");

            migrationBuilder.CreateIndex(
                name: "IX_ClassSessionTeachers_TeacherID",
                table: "ClassSessionTeachers",
                column: "TeacherID");

            migrationBuilder.CreateIndex(
                name: "IX_RoomFeess_RoomSessionID",
                table: "RoomFeess",
                column: "RoomSessionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "ClassSessionTeachers");

            migrationBuilder.DropTable(
                name: "RoomFeess");

            migrationBuilder.DropTable(
                name: "StudentFees");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Teacher");
        }
    }
}
