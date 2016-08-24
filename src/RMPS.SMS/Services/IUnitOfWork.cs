using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using RMPS.SMS.Data;

namespace RMPS.SMS.Services
{
    public interface IUnitOfWork: IDisposable
    {
        
       
        int Commit();

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Async commits this object.
        /// </summary>
        ///-------------------------------------------------------------------------------------------------
        Task<int> CommitAsync();

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///      Rolls backs any pending changes.
        /// </summary>
        ///-------------------------------------------------------------------------------------------------
        void Rollback();

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Creates the collection.
        /// </summary>
        ///
        /// <typeparam name="T">
        ///     Generic type parameter.
        /// </typeparam>
        ///
        /// <returns>
        ///     The new collection&lt; t&gt;
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        ICollection<T> CreateCollection<T>() where T : class,  new();

        /// -------------------------------------------------------------------------------------------------
        ///  <summary>
        ///      Gets the Entity Repository.
        ///  </summary>
        /// 
        ///  <typeparam name="TEntity">
        ///      Type of the entity.
        ///  </typeparam>
        /// <typeparam name="T"></typeparam>
        /// <returns>
        ///      Entity Repository.
        ///  </returns>
        /// -------------------------------------------------------------------------------------------------
        IRepository<T> Get<T>() where T : class;

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing,
        /// or resetting unmanaged resources.
        /// </summary>
       



        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Gets a value indicating whether the log is enabled.
        /// </summary>
        ///
        /// <value>
        ///     true if log enabled, false if not.
        /// </value>
        ///-------------------------------------------------------------------------------------------------
        [Browsable(false)]
        [EditorBrowsable(EditorBrowsableState.Never)]
        bool LoggingEnabled { get; }
    }
}
