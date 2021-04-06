using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Abstract;
using Business.Constants;
using Entities.Concrete;
using Entities.DTOs;

namespace WebApi.Controllers
{

    
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public IActionResult GetAllCarsDetails([FromQuery]FilterDto filter, [FromQuery] int Status)
        {
            if (Status == 2)
            {
                filter.IsRentable = true;
            }
            else
            {
                filter.IsRentable= null;
            }
            
            var result = _carService.GetCarDetails(filter);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost]
        public IActionResult Add([FromForm]Car car, [FromForm] List<IFormFile> image )
        {
            var result = _carService.Add(car,image);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Route("delete")]
        [HttpPost]
        public IActionResult Delete(Car car)
        {
            var result = _carService.Delete(car);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [Route("update")]
        [HttpPost]
        public IActionResult Update(Car car)
        {
            var result = _carService.Update(car);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }

    public class CarAddDto
    {
        public Car Car { get; set; }
        public IFormFile Image { get; set; }
    }

  
}
