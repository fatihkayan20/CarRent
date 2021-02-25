using System.Collections.Generic;
using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;

namespace Business.Concrete
{
    public class CarImageManager:ICarImageService
    {
        private ICarImageDal _carImageDal;

        public CarImageManager(ICarImageDal carImageDal)
        {
            _carImageDal = carImageDal;
        }

        public IDataResult<List<CarImage>> GetAll()
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll());
        }

        public IDataResult<List<CarImage>> GetAllByCarId(int carId)
        {
            return new SuccessDataResult<List<CarImage>>(_carImageDal.GetAll(i => i.CarId == carId));
        }

        public IDataResult<CarImage> GetById(int id)
        {
           return new SuccessDataResult<CarImage>(_carImageDal.Get(i => i.ImageId == id));
        }

        public IResult Add(CarImage carImage)
        {
            _carImageDal.Add(carImage);
            return new SuccessResult("Car image added");
        }

        public IResult Delete(CarImage carImage)
        {
            throw new System.NotImplementedException();
        }

        public IResult Update(CarImage carImage)
        {
            throw new System.NotImplementedException();
        }
    }
}