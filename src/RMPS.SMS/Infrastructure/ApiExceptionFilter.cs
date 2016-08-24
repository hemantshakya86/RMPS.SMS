using System;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TestFramework;
namespace RMPS.SMS.Infrastructure
{
     public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        // public override void OnException(ExceptionContext context)
        // {
        //    new { ErrorMessage = sb.ToString(), StatusCode = statusCode }
        //    var jsonResult = new JsonResult(new { ErrorMessage = context.Exception.Message, });
        //    context.Result = jsonResult;
        //    base.OnException(context);
        //}

        public override void OnException(ExceptionContext context)
        {
            bool isUserException = false;
            Exception exception = context.Exception;
            Type exceptionType = exception.GetType();

            HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
            StringBuilder sb = new StringBuilder();
            if (exceptionType == typeof(UnauthorizedAccessException))
            {
                statusCode = HttpStatusCode.Unauthorized;
                sb.Append(exception.GetExceptionMessage());
            }
            else if (exceptionType == typeof(ArgumentException))
            {
                statusCode = HttpStatusCode.NotFound;
                sb.Append(exception.GetExceptionMessage());
            }
            else if (exceptionType == typeof(ApiException))
            {
                ApiException failure = (ApiException)exception;
                sb.Append(failure.GetExceptionMessage());
                statusCode = failure.StatusCode;
                isUserException = true;
            }
           
            else
            {
                sb.Append(exception.GetExceptionMessage());
            }

            var jsonResult = new JsonResult(new { ErrorMessage = sb.ToString(), StatusCode = statusCode });
            jsonResult.StatusCode = (int)statusCode;
            context.Result = jsonResult;
           

            base.OnException(context);
        }


    }
}
