using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Business.Abstract;
using Business.BusinessAspects.Autofac.Business.BusinessAspects.Autofac;
using Business.Constants;
using Business.ValidationRules.FulentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Utilities.Filter;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.AspNetCore.Http;

namespace Business.Concrete
{
    public class CarManager:ICarService
    {
        private ICarDal _carDal;
        private ICarImageService _carImageService;

        public CarManager(ICarDal carDal, ICarImageService carImageService)
        {
            _carDal = carDal;
            _carImageService = carImageService;
        }
        

        public IDataResult<List<CarDetailsDto>> GetCarDetails(FilterDto filter)
        {
            var a = Filter.DynamicFilter<CarDetailsDto, FilterDto>(filter);
            return new SuccessDataResult<List<CarDetailsDto>>(_carDal.GetCarDetails(a), Messages.CarsListed);
        }


        // [SecuredOperation("add")]
       [ValidationAspect(typeof(CarValidator))]
        public IResult Add(Car car, List<IFormFile> image)
        {
           
            var addedCar = _carDal.Add(car);
            _carImageService.Add(image, new CarImage() { CarId = addedCar.Id });
            return new SuccessResult(Messages.CarCreated);
        }

        public IResult Delete(Car car)
        {
            _carDal.Delete(car);
            return new SuccessResult(Messages.CarDeleted);
        }

        public IResult Update(Car car)
        {
            _carDal.Update(car);
            return new SuccessResult(Messages.CarUpdated);
        }


    }
}
