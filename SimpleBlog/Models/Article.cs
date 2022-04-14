using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Models
{
    public class Article
    {
        public Article()
        {
            Comments = new List<Comment>();
        }
        public int ArticleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
