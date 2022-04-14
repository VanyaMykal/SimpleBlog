using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Models
{
    public class User
    {
        public User()
        {
            Articles = new List<Article>();
            Comments = new List<Comment>();
        }
        public int UserId { get; set; } 
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public List<Article> Articles { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
