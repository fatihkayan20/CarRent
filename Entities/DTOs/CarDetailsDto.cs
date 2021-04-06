using System;
using System.Collections.Generic;
using System.Text;
using Core;
using Core.Entities;
using Entities.Concrete;

namespace Entities.DTOs
{
    public class CarDetailsDto:IDto
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int ColorId { get; set; }
        public int ModelYear { get; set; }
        public int? FindexPuan { get; set; }
        public string BrandName { get; set; }
        public string ColorName { get; set; }
         public List<CarImage> Images { get; set; }
        public decimal DailyPrice { get; set; }
        public string Description { get; set; }
        public bool IsRentable { get; set; }
    }
}
