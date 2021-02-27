using System;
using System.Collections.Generic;
using System.Text;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using System.Linq;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfCarDal: EfEntityRepositoryBase<Car, DatabaseContext>, ICarDal
    {
        public List<CarDetailsDto> GetCarDetails()
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var result = from car in context.Cars
                    join color in context.Colors
                        on car.ColorId equals color.Id 
                             join brand in context.Brands
                        on car.BrandId equals brand.Id
                    select new CarDetailsDto { Id= car.Id, BrandName = brand.Name, ColorName = color.Name, DailyPrice = car.DailyPrice, Description = car.Description, ModelYear = car.ModelYear};

                return result.ToList();
            }
        }

        public CarDetailsDto GetById(int id)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                var result = from car in context.Cars
                    join color in context.Colors
                        on car.ColorId equals color.Id
                    join brand in context.Brands
                        on car.BrandId equals brand.Id
                             where car.Id == id
                    select new CarDetailsDto { Id = car.Id, BrandName = brand.Name, ColorName = color.Name, DailyPrice = car.DailyPrice, Description = car.Description, ModelYear = car.ModelYear };

                return result.First<CarDetailsDto>();
            }
        }
    }
}
