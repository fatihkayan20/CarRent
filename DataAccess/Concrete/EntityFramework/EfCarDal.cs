using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System.Linq;
using System.Linq.Expressions;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal: EfEntityRepositoryBase<Car, DatabaseContext>, ICarDal
    {
        public List<CarDetailsDto> GetCarDetails(Expression<Func<CarDetailsDto, bool>> filter = null)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var result = from c in context.Cars 
                    join b in context.Brands
                        on c.BrandId equals b.Id
                    join co in context.Colors
                        on c.ColorId equals co.Id
                    select new CarDetailsDto
                    {
                        Id = c.Id,
                        BrandId = b.Id,
                        ColorId = co.Id,
                        BrandName = b.Name,
                        ColorName = co.Name,
                        ModelYear = c.ModelYear,
                        DailyPrice = c.DailyPrice,
                        Description = c.Description,
                        Images = (from i in context.CarImages where  i.CarId == c.Id select i).ToList(),
                        FindexPuan = c.FindexPuan,
                        IsRentable = !context.Rentals.Any(r=>r.CarId == c.Id) || !context.Rentals.Any(r => r.CarId == c.Id && (r.ReturnDate == null || (r.ReturnDate.HasValue && r.ReturnDate > DateTime.Now )))
                    };

                return filter == null ? result.ToList() : result.Where(filter).ToList();
           
            }
        }

        
    }
}
