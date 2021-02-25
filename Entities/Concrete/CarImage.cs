#nullable enable
using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities;
using Microsoft.AspNetCore.Http;

namespace Entities.Concrete
{
    public class CarImage: IEntity
    {
        [Key]
        public int ImageId { get; set; }
        public int CarId { get; set; }
        
        public string? ImagePath { get; set; }
        public DateTime CreateDate { get; set; }
    }
}