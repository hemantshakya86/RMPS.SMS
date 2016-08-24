using System;
using System.Net;

namespace TestFramework
{
    public class ApiException : Exception
    {
        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Gets the status code.
        /// </summary>
        ///
        /// <value>
        ///     The status code.
        /// </value>
        ///-------------------------------------------------------------------------------------------------
        public HttpStatusCode StatusCode { get; private set; }

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Initializes a new instance of the ApiException class.
        /// </summary>
        ///
        /// <param name="message">
        ///     The message.
        /// </param>
        /// <param name="statusCode">
        ///     The status code.
        /// </param>
        ///-------------------------------------------------------------------------------------------------
        public ApiException(string message, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
            : base(message)
        {
            this.StatusCode = statusCode;
        }
    }
}
