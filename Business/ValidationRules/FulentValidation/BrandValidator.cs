using Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FulentValidation
{
    public class BrandValidator: AbstractValidator<Brand>
    {
        public BrandValidator()
        {
            RuleFor(b => b.Name).NotEmpty();
        }
    }
}