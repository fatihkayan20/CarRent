using System;
using System.Collections.Generic;
using System.Text;
using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DTOs;
using Microsoft.AspNetCore.Http;

namespace Business.Abstract
{
    public interface ICarService
    {

        IDataResult<List<CarDetailsDto>> GetCarDetails(FilterDto filter);
        IResult Add(Car car , List<IFormFile> image);
        IResult Delete(Car car);
        IResult Update(Car car);
    }
}
