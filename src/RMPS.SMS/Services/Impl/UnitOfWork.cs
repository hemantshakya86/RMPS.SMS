using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RMPS.SMS.Data;

namespace RMPS.SMS.Services.Impl
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext context;
        private Dictionary<string, object> repositories;
        private bool disposed;

        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;
        }


      

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Commits this object.
        /// </summary>
        ///
        /// <exception cref="UnitOfWorkException">
        ///     Thrown when an Unit Of Work error condition occurs.
        /// </exception>
        ///
        /// <returns>
        ///     .
        /// </returns>
        ///-------------------------------------------------------------------------------------------------

        public int Commit()
        {
            try
            {

                
                List<EntityEntry> entries = context.ChangeTracker.Entries().ToList();
                IList<EntityEntry> notifyEntries = entries.Where(entry => entry.Entity is IBaseEntity).ToList();

                foreach (var entry in notifyEntries)
                {
                    IBaseEntity entity = (IBaseEntity)entry.Entity;

                    if (entity.Modified && !entity.Deleted)
                    {
                        context.Update(entity);
                    }

                    if (entity.Deleted)
                    {
                        context.Remove(entity);
                    }

                }

                IList<EntityEntry> addedEntries =
                    notifyEntries.Where(
                        entry => IsState(entry, EntityState.Added) && !IsState(entry, EntityState.Deleted)).ToList();

                IList<EntityEntry> modifiedEntries =
                    notifyEntries.Where(
                        entry => IsState(entry, EntityState.Modified) && !IsState(entry, EntityState.Deleted)).ToList();
                IList<EntityEntry> deletedEntries =
                    notifyEntries.Where(entry => IsState(entry, EntityState.Deleted)).ToList();

               /* var formatters = Container.TryGetAll<IEntityFormatter>();
                foreach (var entry in addedEntries)
                {
                    ((IBaseEntity)entry.Entity).OnBeforeSave(this, true);

                    foreach (var entityFormatter in formatters)
                    {
                        entityFormatter.OnSave(entry.Entity.GetType(), (IBaseEntity)entry.Entity);
                    }
                }

                foreach (var entry in modifiedEntries)
                {
                    ((IBaseEntity)entry.Entity).OnBeforeSave(this, false);
                    foreach (var formatter in formatters)
                    {
                        formatter.OnSave(entry.Entity.GetType(), (IBaseEntity)entry.Entity);
                    }
                }*/
                if (entries.Any(HasChanged))
                {
                    int returnValue = context.SaveChanges();

                    if (returnValue > 0)
                    {
                        foreach (var entry in modifiedEntries)
                        {
                            ((IBaseEntity)entry.Entity).OnSave(this);
                        }

                        foreach (var entry in deletedEntries)
                        {
                            ((IBaseEntity)entry.Entity).OnRemove(this);
                        }

                        return returnValue;
                    }
                }
              
            }
            
           
            catch (Exception exception)
            {
                Exception innerException = exception;
                while (innerException.InnerException != null)
                    innerException = innerException.InnerException;
                throw new Exception(innerException.Message, exception);
            }

            return 0;
            // return context.SaveChanges();

        }

        public Task<int> CommitAsync()
        {
            return Task.Run(() => this.Commit());
        }

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Async commits this object.
        /// </summary>
        ///
        /// <returns>
        ///     .
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        Task<int> IUnitOfWork.CommitAsync()
        {
            return this.CommitAsync();
        }

        public void Rollback()
        {


        }

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Rolls backs any pending changes.
        /// </summary>
        ///-------------------------------------------------------------------------------------------------
        void IUnitOfWork.Rollback()
        {
            this.Rollback();
        }

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
        ICollection<T> IUnitOfWork.CreateCollection<T>()
        {
            return new Collection<T>();
        }

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Override This Method To Dispose Managed Resources.
        /// </summary>
        ///-------------------------------------------------------------------------------------------------

       
        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Gets the Entity Repository.
        /// </summary>
        ///
        /// <typeparam name="TEntity">
        ///     Type of the entity.
        /// </typeparam>
        ///
        /// <returns>
        ///     Entity Repository.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        public IRepository<T> Get<T>() where T : class
        {

            Repository<T> repository = new Repository<T>(context);

            return repository;

        }

      

        

        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Get a new <see cref="IUnitOfWork"/> with new connectionString.
        /// </summary>
        ///
        /// <exception cref="ArgumentNullException">
        ///     Thrown when one or more required arguments are null.
        /// </exception>
        ///
        /// <param name="nameOrConnectionString">
        ///     The context.
        /// </param>
        /// <param name="logEnabled">
        ///     (optional) the log enabled.
        /// </param>
        ///
        /// <returns>
        ///     An instance of <see cref="IUnitOfWork"/>.
        /// </returns>
        ///-------------------------------------------------------------------------------------------------
        
        public EntityState State { get; set; }
        private static bool HasChanged(EntityEntry entity)
        {
            return IsState(entity, EntityState.Added) ||
                   IsState(entity, EntityState.Deleted) ||
                   IsState(entity, EntityState.Modified);
        }

        private static bool IsState(EntityEntry entity, EntityState state)
        {
            return (state) == state;
        }
        ///-------------------------------------------------------------------------------------------------
        /// <summary>
        ///     Gets or sets a value indicating whether the log is enabled.
        /// </summary>
        ///
        /// <value>
        ///     true if log enabled, false if not.
        /// </value>
        ///-------------------------------------------------------------------------------------------------
        public bool LoggingEnabled { get; set; }

        /* public void Commit()
         {
             context.SaveChanges();
         }

         public IRepository<T> IRepository<T>() where T : class
         {
             throw new NotImplementedException();
         }

         public Repository<T> Repository<T>() where T : class 
         {
             if (repositories == null)
             {
                 repositories = new Dictionary<string, object>();
             }

             var type = typeof(T).Name;

             if (!repositories.ContainsKey(type))
             {
                 var repositoryType = typeof(Repository<>);
                 var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(T)), context);
                 repositories.Add(type, repositoryInstance);
             }
             return (Repository<T>)repositories[type];
         }


         public virtual void Dispose(bool disposing)
         {
             if (!disposed)
             {
                 if (disposing)
                 {
                     context.Dispose();
                 }
             }
             disposed = true;
         }

         public void Dispose()
         {
             throw new NotImplementedException();
         }*/

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
