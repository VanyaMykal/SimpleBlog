using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleBlog.Config;
using SimpleBlog.Context.Models;
using SimpleBlog.Models;
using SimpleBlog.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CommentController : Controller
    {
        private readonly BlogContext context;
        private readonly AuthOptions options;
        private readonly IUserRepository userRepository;
        public CommentController(BlogContext context, AuthOptions options, IUserRepository userRepository)
        {
            this.context = context;
            this.options = options;
            this.userRepository = userRepository;
        }

        [HttpGet("{id}")]
        public IActionResult Comments(int id)
        {
            var comments = context.Comments.Select(x => new
            {
                x.CommentId,
                x.Text,
                x.DateTime,
                x.Article,
                x.User.UserName,
            }).ToList().Where(x => x.Article?.ArticleId == id);
            return Ok(comments);
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Comment>>> Create(Comment comment)
        {
            var jwt = Request.Cookies["jwt"];
            var token = options.Verify(jwt);

            var userId = token.Issuer;
            var user = userRepository.GetUserById(userId);
            var newComment = new Comment
            {
                Text = comment?.Text,
                DateTime = comment.DateTime,
                User = user,
                ArticleId = comment.ArticleId
            };
            context.Comments.Add(newComment);
            await context.SaveChangesAsync();
            return Ok(newComment);
        }
    }
}
