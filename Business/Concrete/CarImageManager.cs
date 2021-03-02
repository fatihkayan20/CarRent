using System;
using System.Collections.Generic;
using System.IO;
using Business.Abstract;
using Core.Utilities.FileUploads;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

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
            var result = _carImageDal.GetAll(i => i.CarId == carId);
            
            if (result.Count >0)
            {
                return new SuccessDataResult<List<CarImage>>(result);
            }

            List<CarImage> images = new List<CarImage>();
            images.Add(new CarImage(){CarId = 0, ImageId = 0, ImagePath = "/images/car-rent.png"});
                
            return new SuccessDataResult<List<CarImage>>(images);
        }

        public IDataResult<CarImage> GetById(int id)
        {
           return new SuccessDataResult<CarImage>(_carImageDal.Get(i => i.ImageId == id));
        }

        public IResult Add(IFormFile image ,CarImage carImage)
        {
            
            var imageCount = _carImageDal.GetAll(c => c.CarId == carImage.CarId).Count;

            if (imageCount >= 5)
            {
                return  new ErrorResult("One car must have 5 or less images");
            }

            var imageResult =  FileUpload.Upload(image);
            if (imageResult.Message == "File doesn't exists.")
            {
                return new ErrorResult(imageResult.Message);
            }
            carImage.ImagePath = imageResult.Message;
            _carImageDal.Add(carImage);
            return new SuccessResult("Car image added");
        }

        public IResult Delete(CarImage carImage)
        {
            var image = _carImageDal.Get(c => c.ImageId == carImage.ImageId);
            if (image == null)
            {
                return new ErrorResult("Image not found");
            }

            FileUpload.Delete(image.ImagePath);
            _carImageDal.Delete(carImage);
            return new SuccessResult( "Image was deleted successfully");
        }

        public IResult Update(IFormFile image,CarImage carImage)
        {
            var isImage = _carImageDal.Get(c => c.ImageId == carImage.ImageId);
            if (isImage == null)
            {
                return new ErrorResult("Image not found");
            }

            var updatedFile = FileUpload.Update(image,isImage.ImagePath);
            if (updatedFile.Message == "File doesn't exists.")
            {
                return new ErrorResult(updatedFile.Message);
            }
            carImage.ImagePath = updatedFile.Message;
            _carImageDal.Update(carImage);
            return new SuccessResult("Car image updated");
            
        }
    }
}