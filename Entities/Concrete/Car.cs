using System;
using System.Collections.Generic;
using System.Text;
using Core.Entities;

namespace Entities.Concrete
{
    public class Car: IEntity
    {
        public int Id { get; set; }
        public int BrandId { get; set; }
        public int ColorId { get; set; }
        public int ModelYear { get; set; }
        // Boş ise database üzerinde default olarak 1000 
        public int? FindexPuan { get; set; }
        public decimal DailyPrice { get; set; }
        public string Description { get; set; }
        
    }
    
    
}
