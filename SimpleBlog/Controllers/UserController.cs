using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleBlog.Config;
using SimpleBlog.Context.Models;
using SimpleBlog.Models;
using SimpleBlog.Models.DTO;
using SimpleBlog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IUserRepository userRepository;
        public readonly AuthOptions options;
        public readonly BlogContext context;
        public UserController(IUserRepository userRepository, AuthOptions options, BlogContext context)
        {
            this.userRepository = userRepository;
            this.options = options;
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Users()
        {
            return await context.Users.ToListAsync();
        }
        [HttpPost]
        public IActionResult Register(RegisterModel model)
        {
            User user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                Birthday = model.Birthday,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                ConfirmPassword = BCrypt.Net.BCrypt.HashPassword(model.ConfirmPassword)
            };
            string jwt = "";
            var checkedUserEmail = userRepository.GetUserByEmail(model.Email);
            var checkedUserName = userRepository.GetUserByName(model.UserName);
            if (checkedUserName != null)
            {
                return BadRequest(new { message = "This name already exist" });
            }
            else if (checkedUserEmail != null)
            {
                return BadRequest(new { message = "This email already exist" });
            }
            else if (model.Password != model.ConfirmPassword)
            {
                return BadRequest(new { message = "Password mismatch" });
            }
            else
            {
                jwt = options.GenerateToken(user.Id, user.Email);
                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true
                });
            }
            return Created("ok", new { user = userRepository.Create(user), access_token = jwt});
        }
        [HttpPost]
        public IActionResult Login(LoginModel model)
        {
            var user = userRepository.GetUserByEmail(model.Email);
            if (user==null)
            {
                return BadRequest(new {message =  "Invalid email"});
            }
            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
            {
                return BadRequest(new { message = "Invalid password"});
            }
            var jwt = options.GenerateToken(user.Id, user.Email);
            Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions 
            {
                HttpOnly = true
            });
            return Ok(new 
            {
                message = "ok",
                name = user.UserName,
                access_token = jwt
            });
        }
        
        [HttpGet]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = options.Verify(jwt);

                string userId = token.Issuer;
                var user = userRepository.GetUserById(userId);
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { 
                message = "user logout"
            });
        }
    }
}
