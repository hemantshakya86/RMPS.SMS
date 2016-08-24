using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.EntityFrameworkCore;
using RMPS.SMS.Data;
using TestFramework;
namespace RMPS.SMS.Services.Impl
{
    internal class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationDbContext context;
        private bool IsEntity { get; set; }

        private bool IsAggregateEntity { get; set; }

        public Repository(ApplicationDbContext context)
        {
            this.context = context;
            //IsEntity = typeof(T).GetGenericTypeDefinition()==typeof(T);
            //IsAggregateEntity = typeof(T).GetGenericTypeDefinition()==(typeof(T));

            /*if (IsAggregateEntity)
            {
                IsEntity = false;
            }*/
        }


        [EditorBrowsable(EditorBrowsableState.Never)]
        [Browsable(false)]
        public virtual void Add(T instance)
        {
            if (IsAggregateEntity || IsEntity)
            {
                //this.Add(instance);
            }
            else
            {
                CreateSet().Add(instance);
            }
        }


        public virtual void Save(T instance)
        {
            DbSet<T> dbSet = CreateSet();
            if (IsAggregateEntity)
            {
                this.SaveAggregateRoot(instance, dbSet);
            }
            else if (IsEntity)
            {
                this.SaveEntity(instance, dbSet);
            }
            else
            {
                if (context.Entry(instance).State == EntityState.Detached)
                {
                    dbSet.Add(instance);
                }
                else
                {
                    context.Entry(instance);
                }
            }
        }


        private void SaveEntity(T instance, DbSet<T> dbSet)
        {
            IEntity<Guid> entityWithGuid = instance as IEntity<Guid>;
            if (entityWithGuid != null)
            {
                if (entityWithGuid.ID == Guid.Empty)
                {
                    entityWithGuid.ID = Guid.NewGuid();

                    dbSet.Add(instance);
                }
                else
                {
                    if (context.Entry(instance).State == EntityState.Detached)
                    {
                        //CreateSet().Attach(instance);
                    }

                    context.Entry(entityWithGuid);
                }

                return;
            }

            IEntity<int> entityWithInt = instance as IEntity<int>;
            if (entityWithInt != null)
            {
                if (entityWithInt.ID <= 0)
                {
                    dbSet.Add(instance);
                }
                else
                {
                    if (context.Entry(instance).State == EntityState.Detached)
                    {
                        //CreateSet().Attach(instance);
                    }

                    context.Entry(entityWithInt);
                }

                return;
            }

            IEntity<long> entityWithLong = instance as IEntity<long>;
            if (entityWithLong != null)
            {
                if (entityWithLong.ID <= 0)
                {
                    dbSet.Add(instance);
                }
                else
                {
                    if (context.Entry(instance).State == EntityState.Detached)
                    {
                        //CreateSet().Attach(instance);
                    }

                    context.Entry(entityWithLong);
                }

                return;
            }

            IEntity<string> entityWithString = instance as IEntity<string>;
            if (entityWithString != null)
            {
                if (entityWithString.RowVersion == null)
                {
                    dbSet.Add(instance);
                }
                else
                {
                    if (context.Entry(instance).State == EntityState.Detached)
                    {
                        //CreateSet().Attach(instance);
                    }

                    context.Entry(entityWithString);
                }
            }
        }


        private void SaveAggregateRoot(T instance, DbSet<T> dbSet)
        {
            /* IAggregateRoot<Guid> entityWithGuid = instance as IAggregateRoot<Guid>;

             if (entityWithGuid != null)
             {
                 if (entityWithGuid.ID == Guid.Empty)
                 {
                     entityWithGuid.ID = Guid.NewGuid().ToCombGuid();

                     dbSet.Add(instance);
                 }
                 else
                 {
                     entityWithGuid.LastUpdatedDate = DateTime.UtcNow;

                     if (context.Entry(instance).State == EntityState.Detached)
                     {
                         //CreateSet().Attach(instance);
                     }

                     context.MarkAsModified(instance);
                 }

                 return;
             }

             IAggregateRoot<int> entityWithInt = instance as IAggregateRoot<int>;

             if (entityWithInt != null)
             {
                 if (entityWithInt.ID <= 0)
                 {
                     dbSet.Add(instance);
                 }
                 else
                 {
                     entityWithInt.LastUpdatedDate = DateTime.UtcNow;

                     if (context.Entry(instance).State == EntityState.Detached)
                     {
                         //CreateSet().Attach(instance);
                     }

                     context.MarkAsModified(instance);
                 }

                 return;
             }

             IAggregateRoot<long> entityWithlong = instance as IAggregateRoot<long>;

             if (entityWithlong != null)
             {
                 if (entityWithlong.ID <= 0)
                 {
                     dbSet.Add(instance);
                 }
                 else
                 {
                     entityWithlong.LastUpdatedDate = DateTime.UtcNow;

                     if (context.Entry(instance).State == EntityState.Detached)
                     {
                         //CreateSet().Attach(instance);
                     }

                     context.MarkAsModified(entityWithlong);
                 }

                 return;
             }

             IAggregateRoot<string> entityWithString = instance as IAggregateRoot<string>;

             if (entityWithString != null)
             {
                 if (!entityWithString.LastUpdatedDate.HasValue)
                 {
                     dbSet.Add(instance);
                 }
                 else
                 {
                     entityWithString.LastUpdatedDate = DateTime.UtcNow;

                     if (context.Entry(instance).State == EntityState.Detached)
                     {
                         //CreateSet().Attach(instance);
                     }

                     context.MarkAsModified(entityWithString);
                 }
             }*/
        }


        public virtual void Remove(T instance)
        {
            if (!IsAggregateEntity)
            {
                context.Entry(instance);
            }

            /*
                        instance.Deleted = true;
            */

            CreateSet().Remove(instance);

        }


        public void Remove(Expression<Func<T, bool>> predicate)
        {
            T instance = this.One(predicate);

            if (!IsAggregateEntity)
            {
                context.Entry(instance);
            }

            CreateSet().Remove(instance);
        }


        public virtual T One(
            Expression<Func<T, bool>> predicate = null,
            params Expression<Func<T, object>>[] includes)
        {
            var set = CreateIncludedSet(includes);

            return (predicate == null) ?
                   set.FirstOrDefault() :
                   set.FirstOrDefault(predicate);
        }


        public virtual Task<T> OneAsync(Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes)
        {
            var set = CreateIncludedSet(includes);

            return (predicate == null) ?
                   set.FirstOrDefaultAsync() :
                   set.FirstOrDefaultAsync(predicate);
        }

        /*        public IQueryable<TResult> SelectAll<TResult>(Expression<Func<T, TResult>> @select, Expression<Func<T, bool>> predicate = null, params Expression<Func<T, object>>[] includes)
                {
                    return predicate == null
                               ? this.CreateIncludedSet(includes).Select(@select)
                               : this.CreateIncludedSet(includes).Where(predicate).Select(@select);
                }*/

        /*        public virtual TResult SelectOne<TResult>(
                                Expression<Func<T, TResult>> select,
                   Expression<Func<T, bool>> predicate = null,
                   params Expression<Func<T, object>>[] includes)
                {
                    return predicate == null
                               ? this.CreateIncludedSet(includes).Select(@select).FirstOrDefault()
                               : this.CreateIncludedSet(includes).Where(predicate).Select(@select).FirstOrDefault();
                }*/


        public virtual IQueryable<T> Where(
            Expression<Func<T, bool>> predicate = null,
            params Expression<Func<T, object>>[] includes)
        {
            var set = CreateIncludedSet(includes);

            return (predicate == null) ? set.AsExpandable() : set.Where(predicate).AsExpandable();
        }

        public IQueryable<T> Query
        {

            get
            {
                return this.CreateSet().AsExpandable();
            }
        }


        public virtual bool Exists(
            Expression<Func<T, bool>> predicate = null)
        {
            var set = CreateSet();

            return (predicate == null) ? set.Any() : set.Any(predicate);
        }


        public virtual Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate = null)
        {
            var set = CreateSet();

            return (predicate == null) ? set.AnyAsync() : set.AnyAsync(predicate);
        }


        public virtual int Count(
            Expression<Func<T, bool>> predicate = null)
        {
            var set = CreateSet();

            return (predicate == null) ?
                   set.Count() :
                   set.Count(predicate);
        }



        public virtual Task<int> CountAsync(Expression<Func<T, bool>> predicate = null)
        {
            var set = CreateSet();

            return (predicate == null) ?
                   set.CountAsync() :
                   set.CountAsync(predicate);
        }


        private DbSet<T> CreateIncludedSet(
            IEnumerable<Expression<Func<T, object>>> includes)
        {
            var set = CreateSet();

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    set.Include(include);
                }
            }

            return set;
        }


        private DbSet<T> CreateSet()
        {
            return context.CreateSet<T>();
        }


    }
}


