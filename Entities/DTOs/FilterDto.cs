namespace Entities.DTOs
{
    public class FilterDto
    {
        public int? Id { get; set; }
        public int? BrandId { get; set; }
        public int? ColorId { get; set; }
        public bool? IsRentable { get; set; }
    }
}