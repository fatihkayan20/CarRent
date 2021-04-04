namespace Entities.Concrete
{
    public class Payment
    {
        public string Number { get; set; }
        public string ExpiryMonth { get; set; }
        public string ExpiryYear { get; set; }
        public string Cvv { get; set; }
        public string Owner { get; set; }
    }
}