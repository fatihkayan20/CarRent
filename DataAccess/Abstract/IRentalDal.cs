using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using Core.DataAccess;
using Entities;
using Entities.Concrete;
using Entities.DTOs;

namespace DataAccess.Abstract
{
    public interface IRentalDal: IEntityRepository<Rental>
    {
        List<RentalDetailDto> GetAllWithDetail(Expression<Func<RentalDetailDto, bool>> filter = null);
    }
}
