using SimpleBlog.Context.Models;
using SimpleBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly BlogContext context;
        public ArticleRepository(BlogContext context)
        {
            this.context = context;
        }
        public Article Create(Article article)
        {
            context.Articles.Add(article);
            context.SaveChanges();
            return article;
        }
    }
}
