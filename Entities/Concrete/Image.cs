using Core.Entities;
using Microsoft.AspNetCore.Http;

namespace Entities.Concrete
{
    public class Image
    {
        public IFormFile Files { get; set; }
    }
}