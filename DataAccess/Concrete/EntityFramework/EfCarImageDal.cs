using System.Collections.Generic;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarImageDal:EfEntityRepositoryBase<CarImage, DatabaseContext>, ICarImageDal
    {
        public void MultipleAdd(List<CarImage> images)
        {
            for (int i = 0; i < images.Count; i++)
            {
                Add(images[i]);
            }
        }
        public void MultipleDelete(List<CarImage> images)
        {
            for (int i = 0; i < images.Count; i++)
            {
                Delete(images[i]);
            }
        }
    }
}