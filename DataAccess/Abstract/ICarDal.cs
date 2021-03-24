using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Core.DataAccess;
using Entities.Concrete;
using Entities.DTOs;

namespace DataAccess.Abstract
{
    public interface ICarDal: IEntityRepository<Car>
    {
        List<CarDetailsDto> GetCarDetails(Expression<Func<CarDetailsDto, bool>> filter = null);
    }
}
