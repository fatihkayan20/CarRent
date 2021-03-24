using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Core.Utilities.Filter
{
    public class Filter
    {
        public static Expression<Func<TDto, bool>> DynamicFilter<TDto, TFilterDto>(TFilterDto filter)
        {
            Expression propertyExp, someValue, containsMethodExp, combinedExp;
            Expression<Func<TDto, bool>> exp = c => true, oldExp;
            MethodInfo method;

            var parameterExp = Expression.Parameter(typeof(TDto), "type");
            foreach (PropertyInfo propertyInfo in filter.GetType().GetProperties())
            {
                if (propertyInfo.GetValue(filter, null) != null)
                {
                    oldExp = exp;
                    propertyExp = Expression.Property(parameterExp, propertyInfo.Name);
                    method = typeof(object).GetMethod("Equals", new[] { typeof(object) });
                    someValue = Expression.Constant(filter.GetType().GetProperty(propertyInfo.Name).GetValue(filter, null), typeof(object));
                    containsMethodExp = Expression.Call(propertyExp, method, someValue);
                    exp = Expression.Lambda<Func<TDto, bool>>(containsMethodExp, parameterExp);
                    combinedExp = Expression.AndAlso(exp.Body, oldExp.Body);
                    exp = Expression.Lambda<Func<TDto, bool>>(combinedExp, exp.Parameters[0]);
                    
                }
            }
            return exp;
        }
    }
}
