using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
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
            var result = _carImageDal.GetAll(i => i.CarId == carId);
            
            if (result.Count >0)
            {
                return new SuccessDataResult<List<CarImage>>(result);
            }

            List<CarImage> images = new List<CarImage>();
            images.Add(new CarImage(){CarId = 0 ,ImageId = 0, CreateDate = DateTime.Now , ImagePath = "/images/car-rent.png"});
                
            return new SuccessDataResult<List<CarImage>>(images);


        }

        public IDataResult<CarImage> GetById(int id)
        {
           return new SuccessDataResult<CarImage>(_carImageDal.Get(i => i.ImageId == id));
        }

        public IResult Add(Image image ,CarImage carImage)
        {
            
            var imageCount = _carImageDal.GetAll(c => c.CarId == carImage.CarId).Count;

            if (imageCount >= 5)
            {
                return  new ErrorResult("One car must have 5 or less images");
            }
            var currentDirectory = Environment.CurrentDirectory + "\\wwwroot";
            var path = "\\images\\";
            string randomName = null;
            string type = null;
            
                
            if (image.Files != null && image.Files.Length > 0)
            {
                randomName = Guid.NewGuid().ToString();
                type = Path.GetExtension(image.Files.FileName);
                
                if (type != ".jpeg" && type != ".png" && type != ".jpg")
                {
                    return new ErrorResult("Wrong file type.");
                }
                    
                if (!Directory.Exists(currentDirectory+path))
                {
                    Directory.CreateDirectory(currentDirectory+path);
                }
                
                using (FileStream fs = File.Create(currentDirectory+path+ randomName  +type ))
                {
                    image.Files.CopyTo(fs);
                    fs.Flush();
                    carImage.ImagePath = (path + randomName + type).Replace("\\", "/" );
                    carImage.CreateDate = DateTime.Now;
                }

                _carImageDal.Add(carImage);
                return new SuccessResult("Car image added");
            }

            return new ErrorResult("File doesn't exists.");
        }

        public IResult Delete(CarImage carImage)
        {
            var image = _carImageDal.Get(c => c.ImageId == carImage.ImageId);
            if (image == null)
            {
                return new ErrorResult("Image not found");
            }

            var path = "wwwroot"  + image.ImagePath;
            
            if (File.Exists(path.Replace("/", "\\")))
            {
                File.Delete(path.Replace("/", "\\"));
            }
            _carImageDal.Delete(carImage);
            return new SuccessResult( "Image was deleted successfully");
        }

        public IResult Update(Image image,CarImage carImage)
        {
            var isImage = _carImageDal.Get(c => c.ImageId == carImage.ImageId);
            if (isImage == null)
            {
                return new ErrorResult("Image not found");
            }

            var imagePathh = "wwwroot"  + isImage.ImagePath;
            
            if (File.Exists(imagePathh.Replace("/", "\\")))
            {
                File.Delete(imagePathh.Replace("/", "\\"));
            }
            
            var path = "\\images\\";
            var currentDirectory = Environment.CurrentDirectory + "\\wwwroot";
            string randomName = null;
            string type = null;
            
            if (image.Files != null && image.Files.Length > 0)
            {
                randomName = Guid.NewGuid().ToString();
                type = Path.GetExtension(image.Files.FileName);
                    
                if (!Directory.Exists(currentDirectory+path))
                {
                    Directory.CreateDirectory(currentDirectory+path);
                }
                
                if (type != ".jpeg" && type != ".png" && type != ".jpg")
                {
                    return new ErrorResult("Wrong file type.");
                }
                
                using (FileStream fs = System.IO.File.Create(currentDirectory+path+ randomName  +type ))
                {
                    image.Files.CopyTo(fs);
                    fs.Flush();
                    carImage.ImagePath = (path + randomName + type).Replace("\\", "/" );
                    carImage.CreateDate = isImage.CreateDate;
                }

                _carImageDal.Update(carImage);
                return new SuccessResult("Car image updated");
            }
            return new ErrorResult( "File doesn't exists");
        }
    }
}