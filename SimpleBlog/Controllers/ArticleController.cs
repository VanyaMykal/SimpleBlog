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
    public class ArticleController : Controller
    {
        private readonly BlogContext context;
        private readonly AuthOptions options;
        private readonly IUserRepository userRepository;
        public ArticleController(BlogContext context, AuthOptions options, IUserRepository userRepository)
        {
            this.context = context;
            this.options = options;
            this.userRepository = userRepository;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> Articles()
        {
            return await context.Articles.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticle(int id)
        {
            var article = await context.Articles.FirstOrDefaultAsync(x=>x.ArticleId == id);
            if (article==null)
            {
                return NotFound();
            }
            return Ok(article);
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Article>>> Create(Article article)
        {
            var jwt = Request.Cookies["jwt"];
            var token = options.Verify(jwt);

            string userId = token.Issuer;
            var user = userRepository.GetUserById(userId);

            var newArticle = new Article
            {
                Title = article.Title,
                Description = article.Description,
                Image = article.Image,
                User = user
            };
            context.Articles.Add(newArticle);
            await context.SaveChangesAsync();
            return Ok(newArticle);
        }
        [HttpGet]
        public IActionResult MyArticles()
        {
            var jwt = Request.Cookies["jwt"];
            var token = options.Verify(jwt);

            string userId = token.Issuer;
            var user = userRepository.GetUserById(userId);
            var articles = context.Articles.Select(x=> new
            {
                x.ArticleId,
                x.Title,
                x.Description,
                x.Image,
                x.User.UserName
            }).ToList().Where(x=>x.UserName == user.UserName);
            return Ok(articles);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Article>>> Delete(int id)
        {
            var curentArticle = await context.Articles.FirstOrDefaultAsync(x=>x.ArticleId == id);
            if (curentArticle == null)
            {
                return NotFound();
            }
            context.Articles.Remove(curentArticle);
            await context.SaveChangesAsync();
            return Ok(curentArticle);
        }
        [HttpPut]
        public async Task<ActionResult<IEnumerable<Article>>> Edit(Article article)
        {
            if (article == null)
            {
                return BadRequest();
            }
            if (!context.Articles.Any(x=>x.ArticleId==article.ArticleId))
            {
                return NotFound();
            }
            context.Articles.Update(article);
            await context.SaveChangesAsync();
            return Ok(article);
        }
    }
}
