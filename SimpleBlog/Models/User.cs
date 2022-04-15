using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Articles = new List<Article>();
            Comments = new List<Comment>();
        }
        public string Birthday { get; set; }
        public string ConfirmPassword { get; set; }
        public List<Article> Articles { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
