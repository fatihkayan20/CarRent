using Entities;
using Entities.Concrete;
using FluentValidation;

namespace Business.ValidationRules.FulentValidation
{
    public class CustomerValidator: AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            RuleFor(c => c.UserId).NotEmpty();
            RuleFor(c => c.CompanyName).NotEmpty();
            RuleFor(c => c.CompanyName).MinimumLength(5);
        }
    }
}