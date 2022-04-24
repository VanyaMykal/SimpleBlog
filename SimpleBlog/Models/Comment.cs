using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Models
{
    public class Comment
    {
        public int CommentId { get; set; }
        public string Text { get; set; }
        public string DateTime { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? ArticleId { get; set; }
        public Article Article { get; set; }
    }
}
