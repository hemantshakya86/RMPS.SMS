using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RMPS.SMS.Data.Migrations
{
    public partial class SessionStudentS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SessionStudents",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClassID = table.Column<int>(nullable: false),
                    RoomSessionsID = table.Column<int>(nullable: false),
                    StudentID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionStudents", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SessionStudents_RoomSessions_RoomSessionsID",
                        column: x => x.RoomSessionsID,
                        principalTable: "RoomSessions",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SessionStudents_RoomSessionsID",
                table: "SessionStudents",
                column: "RoomSessionsID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SessionStudents");
        }
    }
}
