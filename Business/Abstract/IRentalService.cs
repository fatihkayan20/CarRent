using System;
using System.Collections.Generic;
using System.Text;
using Core.Utilities.Results;
using Entities;
using Entities.Concrete;
using Entities.DTOs;

namespace Business.Abstract
{
    public interface IRentalService
    {
        IDataResult<List<RentalDetailDto>> GetAll();
        IDataResult<RentalDetailDto> GetById(int id);
        IResult Add(Rental rental, Payment payment);
        IResult Delete(Rental rental);
        IResult Update(Rental rental);
    }
}
