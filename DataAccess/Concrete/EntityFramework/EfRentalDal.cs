using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Core.DataAccess.EntityFramework;
using DataAccess.Abstract;
using Entities;
using Entities.Concrete;
using Entities.DTOs;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfRentalDal: EfEntityRepositoryBase<Rental, DatabaseContext>, IRentalDal
    {
        public List<RentalDetailDto> GetAllWithDetail(Expression<Func<RentalDetailDto, bool>> filter = null)
        {
            using (var context = new DatabaseContext())
            {
                var result = from rental in context.Rentals
                    join customer in context.Customers
                        on rental.CustomerId equals customer.Id
                    join user in context.Users
                        on customer.UserId equals user.Id
                    join car in context.Cars
                        on rental.CarId equals car.Id
                    join brand in context.Brands
                        on car.BrandId equals brand.Id
                    select new RentalDetailDto()
                    {
                        Id = rental.Id,
                        BrandName = brand.Name,
                        CustomerFullName = user.FirstName.Substring(0,1).ToUpper()+ user.FirstName.Substring(1) + " "+  user.LastName.ToUpper(),
                        RentDate = rental.RentDate,
                        ReturnDate = rental.ReturnDate
                    };

                if (filter != null)
                {
                    return result.Where(filter).ToList();
                }
                return result.ToList();
            }
        } 
       
    }
}
