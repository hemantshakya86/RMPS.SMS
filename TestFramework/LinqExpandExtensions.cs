using System.Linq;
using System.Linq.Expressions;

namespace TestFramework
{
    public static class LinqExpandExtensions
    {
        public static IQueryable<T> AsExpandable<T>(this IQueryable<T> query)
        {
            if (query is ExpandableQuery<T>) return query;
            return new ExpandableQuery<T>(query);
        }

        public static Expression<TDelegate> Expand<TDelegate>(this Expression<TDelegate> expr)
        {
            return (Expression<TDelegate>)new ExpressionExpander().Visit(expr);
        }

        public static Expression Expand(this Expression expr)
        {
            return new ExpressionExpander().Visit(expr);
        }
    }
}
