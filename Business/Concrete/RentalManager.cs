using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Business.Abstract;
using Business.Constants;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities;

namespace Business.Concrete
{
    public class RentalManager: IRentalService
    {
        private IRentalDal _rentalDal;

        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }
        public IDataResult<List<Rental>> GetAll()
        {
            return new SuccessDataResult<List<Rental>>(_rentalDal.GetAll(), Messages.RentalsListed);
        }

        public IDataResult<Rental> GetById(int id)
        {
            return new SuccessDataResult<Rental>(_rentalDal.Get(r=> r.Id == id), Messages.RentalRetrieved);
        }

        public IResult Add(Rental rental)
        {
            var result = _rentalDal.Get(f =>
                f.CarId == rental.CarId && (f.ReturnDate == null || f.ReturnDate > DateTime.Now));

            if (result != null)
            {
                return new ErrorResult(Messages.CarAlreadyRented);
            }
            _rentalDal.Add(rental);
            return new SuccessResult(Messages.RentalCreated);
            
        }

        public IResult Delete(Rental rental)
        {
            _rentalDal.Delete(rental);
            return new SuccessResult(Messages.RentalDeleted);
        }

        public IResult Update(Rental rental)
        {
            _rentalDal.Update(rental);
            return new SuccessResult(Messages.RentalUpdated);
        }
    }
}
