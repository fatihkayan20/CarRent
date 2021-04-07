using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarImagesController : ControllerBase
    {
        private ICarImageService _carImageService;

        public CarImagesController(ICarImageService carImageService)
        {
            _carImageService = carImageService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _carImageService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        
        [HttpGet("car/{carId}")]
        public IActionResult GetAllByCarId(int carId)
        {
            var result = _carImageService.GetAllByCarId(carId);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var result = _carImageService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
        
        [HttpPost("add")]
        public IActionResult Add([FromForm] List<IFormFile> images, [FromForm] CarImage carImage )
        {
            
            var result = _carImageService.Add(images, carImage);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }  
        
        
        [HttpPost("uploadImages")]
        public IActionResult UploadImages([FromForm] List<IFormFile> images, [FromForm] CarImage carImage )
        {
            
            var result = _carImageService.Add(images, carImage);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }    
        
        [HttpPost("deleteImages")]
        public IActionResult DeleteMultipleImages(List<CarImage> images )
        {
            
            var result = _carImageService.DeleteAll(images);
            if (result.Success)
            {
                return Ok(result);
            }   
            return BadRequest(result);
        }
        
        [HttpPost("delete")]
        public IActionResult Delete(CarImage carImage )
        {
            var result = _carImageService.Delete(carImage);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        
        [HttpPost("update")]
        public IActionResult Update([FromForm] IFormFile image, [FromForm] CarImage carImage )
        {
            var result = _carImageService.Update(image,carImage);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        
        
    }
}