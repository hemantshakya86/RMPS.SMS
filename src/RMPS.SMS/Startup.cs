using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using RMPS.SMS.Data;
using RMPS.SMS.Infrastructure;
using RMPS.SMS.Models;
using RMPS.SMS.Services;
using RMPS.SMS.Services.Impl;
using RMPS.SMS.ViewModel;

namespace RMPS.SMS
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
            KnockoutModelBuilder.Save(Path.Combine(env.WebRootPath, "js"), Assembly.GetEntryAssembly());
            AutoMapper.Mapper.Initialize(config =>
            {
                config.CreateMap<StudentModel, Student>();
                config.CreateMap<RoomFeesModel, RoomFees>();
                config.CreateMap<RoomFees, RoomFeesModel>();
            });
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new ApiExceptionFilter());
            });
            // Convert to upper case on web api data 'AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver())'
            services.AddMvc().AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ICoursesService, CoursesService>();
            services.AddTransient<IRoomSessionsService, RoomSessionsService>();
            services.AddTransient<IClassRoomsService, ClassRoomsService>();
            services.AddTransient<ISessionsService, SessionsService>();
            services.AddTransient<ISessionStudentService, SessionStudentService>();
            services.AddTransient<IStudentService, StudentService>();
            services.AddTransient<IStudentFeesService, StudentFeesService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
