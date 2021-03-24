using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FulentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities;
using Entities.Concrete;
using Entities.DTOs;

namespace Business.Concrete
{
    public class RentalManager: IRentalService
    {
        private IRentalDal _rentalDal;

        public RentalManager(IRentalDal rentalDal)
        {
            _rentalDal = rentalDal;
        }
        public IDataResult<List<RentalDetailDto>> GetAll()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetAllWithDetail(), Messages.RentalsListed);
        }

        public IDataResult<RentalDetailDto> GetById(int id)
        {
            return new SuccessDataResult<RentalDetailDto>(_rentalDal.GetAllWithDetail(r => r.Id == id).FirstOrDefault(), Messages.RentalRetrieved);
        }

        [ValidationAspect(typeof(RentalValidator))]
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
