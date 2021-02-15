using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess;
using Entities;

namespace DataAccess.Abstract
{
    public interface IRentalDal: IEntityRepository<Rental>
    {
    }
}
