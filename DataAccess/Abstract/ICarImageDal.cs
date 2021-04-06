using System.Collections.Generic;
using Core.DataAccess;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace DataAccess.Abstract
{
    public interface ICarImageDal:IEntityRepository<CarImage>
    {
        void MultipleAdd(List<CarImage> images);
        void MultipleDelete(List<CarImage> images);

    }
}