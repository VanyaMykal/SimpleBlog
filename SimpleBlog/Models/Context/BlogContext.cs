using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimpleBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Context.Models
{
    public class BlogContext : IdentityDbContext<User>
    {
        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public BlogContext(DbContextOptions<BlogContext> options): base(options)
        {
            Database.EnsureCreated();
        }
    }
}
