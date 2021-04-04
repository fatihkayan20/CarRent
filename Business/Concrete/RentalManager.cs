using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Business.Abstract;
using Business.Constants;
using Business.ValidationRules.FulentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities;
using Entities.Concrete;
using Entities.DTOs;

namespace Business.Concrete
{
    public class RentalManager : IRentalService
    {
        private IRentalDal _rentalDal;
        private ICustomerService _customerService;
        private ICarService _carService;
        private IPaymentService _paymentService;

        public RentalManager(IRentalDal rentalDal,ICustomerService customerService ,ICarService carService,IPaymentService paymentService)
        {
            _rentalDal = rentalDal;
            _customerService = customerService;
            _carService = carService;
            _paymentService = paymentService;
        }

        public IDataResult<List<RentalDetailDto>> GetAll()
        {
            return new SuccessDataResult<List<RentalDetailDto>>(_rentalDal.GetAllWithDetail(), Messages.RentalsListed);
        }

        public IDataResult<RentalDetailDto> GetById(int id)
        {
            return new SuccessDataResult<RentalDetailDto>(_rentalDal.GetAllWithDetail(r => r.Id == id).FirstOrDefault(),
                Messages.RentalRetrieved);
        }

        [ValidationAspect(typeof(RentalValidator))]
        public IResult Add(Rental rental , Payment payment)
        {
            var rules = BusinessRules.Run(CheckCarIsAvailebale(rental), CheckFindexPuan(rental));
            if (rules != null)
            {
                return rules;
            }

            var isPaymented = _paymentService.Add(payment);

            if (!isPaymented.Success)
            {
                return new ErrorResult("Caz yapma para öde");
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

        private IResult CheckCarIsAvailebale(Rental rental)
        {
            var result = _rentalDal.Get(f =>
                f.CarId == rental.CarId && (f.ReturnDate == null || f.ReturnDate > DateTime.Now));

            if (result != null)
            {
                return new ErrorResult(Messages.CarAlreadyRented);
            }

            return new SuccessResult();
        }
        private IResult CheckFindexPuan(Rental rental)
        {
            var customer = _customerService.GetById(rental.CustomerId);
            var car = _carService.GetCarDetails(new FilterDto() {Id = rental.CarId});

            if (customer.Data.FindexPuan > car.Data[0].FindexPuan)
            {
                return new SuccessResult();
            }
            return new ErrorResult("Your findex puan is less than this car's");
            
        }
    
}
}
