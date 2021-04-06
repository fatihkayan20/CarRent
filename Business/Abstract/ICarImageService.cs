using System.Collections.Generic;
using Core.Utilities.Results;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;

namespace Business.Abstract
{
    public interface ICarImageService
    {
        IDataResult<List<CarImage>> GetAll();
        IDataResult<List<CarImage>> GetAllByCarId(int carId);
        IDataResult<CarImage> GetById(int id);
        IResult Add(List<IFormFile >image,CarImage carImage);
        IResult DeleteAll(List<CarImage> carImage);
        IResult Delete( CarImage carImage);
        IResult Update(IFormFile image,CarImage carImage);
    }
}