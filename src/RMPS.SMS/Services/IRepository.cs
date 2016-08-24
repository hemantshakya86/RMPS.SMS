using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RMPS.SMS.Services
{
    public interface IRepository<T> where T : class
    {
        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Adds entity.
        /// </summary>
        ///
        /// <param name="instance">
        ///     The instance to add.
        /// </param>
        ///-------------------------------------------------------------------------------------------------
        void Add(T instance);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Saves the given entity.
        /// </summary>
        ///
        /// <param name="instance">
        ///     The instance to add.
        /// </param>
        ///-------------------------------------------------------------------------------------------------
        void Save(T instance);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Removes the given inentitystance.
        /// </summary>
        ///
        /// <param name="instance">
        ///     The instance to add.
        /// </param>
        ///-------------------------------------------------------------------------------------------------
        void Remove(T instance);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Removes the entity by given predicate.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate used to remove entity.
        /// </param>
        ///-------------------------------------------------------------------------------------------------
        void Remove(Expression<Func<T, bool>> predicate);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Get First entity by specified expression.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate to remove.
        /// </param>
        /// <param name="includes">
        ///     A variable-length parameters list containing includes.
        /// </param>
        ///
        /// <returns>
        ///     First entity or null.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        T One(
            Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);

        /*        ///-------------------------------------------------------------------------------------------------
                /// <summary>
                ///     Get all entity converted to selected result.
                /// </summary>
                ///
                /// <typeparam name="TResult">
                ///     Type of the result.
                /// </typeparam>
                /// <param name="select">
                ///     The select.
                /// </param>
                /// <param name="predicate">
                ///     The predicate to select.
                /// </param>
                /// <param name="includes">
                ///     A variable-length parameters list containing includes.
                /// </param>
                ///
                /// <returns>
                ///     A List of Result specified by predicate.
                /// </returns>
                ///-------------------------------------------------------------------------------------------------
                IQueryable<TResult> SelectAll<TResult>(
                    Expression<Func<T, TResult>> select,
                    Expression<Func<T, bool>> predicate = null,
                    params Expression<Func<T, object>>[] includes);*/

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Get all entities specified by predicate.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate to select.
        /// </param>
        /// <param name="includes">
        ///     A variable-length parameters list containing includes.
        /// </param>
        ///
        /// <returns>
        ///     A List of entities specified by predicate.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        IQueryable<T> Where(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);


        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Gets the query.
        /// </summary>
        ///
        /// <value>
        ///     The query.
        /// </value>
        ///-------------------------------------------------------------------------------------------------
        IQueryable<T> Query
        {

            get;
        }

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Exists the given predicate.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate to remove.
        /// </param>
        ///
        /// <returns>
        ///     true if it succeeds, false if it fails.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        bool Exists(Expression<Func<T, bool>> predicate = null);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Counts the records by given predicate.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate to remove.
        /// </param>
        ///
        /// <returns>
        ///     Records Count.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        int Count(Expression<Func<T, bool>> predicate = null);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Gets a context for the scope.
        /// </summary>
        ///
        /// <value>
        ///     The scope context.
        /// </value>
        ///-------------------------------------------------------------------------------------------------
      /*  [EditorBrowsable(EditorBrowsableState.Never)]
        [Browsable(false)]
        IUnitOfWork UnitOfWork { get; }*/

        /*        ///-------------------------------------------------------------------------------------------------
                /// <summary>
                ///     Get First entity by specified expression.
                /// </summary>
                ///
                /// <typeparam name="TResult">
                ///     Type of the result.
                /// </typeparam>
                /// <param name="select">
                ///     The select.
                /// </param>
                /// <param name="predicate">
                ///     The predicate to remove.
                /// </param>
                /// <param name="includes">
                ///     A variable-length parameters list containing includes.
                /// </param>
                ///
                /// <returns>
                ///     Converted Entity to specified Type or null.
                /// </returns>
                ///-------------------------------------------------------------------------------------------------
                TResult SelectOne<TResult>(
                    Expression<Func<T, TResult>> select,
                    Expression<Func<T, bool>> predicate = null,
                    params Expression<Func<T, object>>[] includes);*/

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Get First entity by specified expression async.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate to remove.
        /// </param>
        /// <param name="includes">
        ///     A variable-length parameters list containing includes.
        /// </param>
        ///
        /// <returns>
        ///     First entity or null.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------

        Task<T> OneAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes);

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Counts the records by given predicate async.
        /// </summary>
        ///
        /// <param name="predicate">
        ///     The predicate to remove.
        /// </param>
        ///
        /// <returns>
        ///     Records Count.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------

        Task<int> CountAsync(Expression<Func<T, bool>> predicate = null);


        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate = null);
    }
}
