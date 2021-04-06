using Microsoft.AspNetCore.Mvc;
using Business.Abstract;
using Core.Entities.Concrete;
using Entities.Concrete;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _userService.GetAll();
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost]
        public IActionResult Add(User user)
        {
            var result = _userService.Add(user);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Route("update")]
        [HttpPost]
        public IActionResult Update(UserUpdate userUpdate)
        {
            var result = _userService.Update(userUpdate.User,userUpdate.Customer);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [Route("delete")]
        [HttpPost]
        public IActionResult Delete(User user)
        {
            var result = _userService.Delete(user);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }
        
        public class UserUpdate
        {
            public User User { get; set; }
            public Customer Customer { get; set; }
        }
    }
}
