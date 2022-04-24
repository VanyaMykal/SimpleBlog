using SimpleBlog.Context.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Models.Test
{
    public class TestData
    {
        public static void Initialize(BlogContext context)
        {
            User user1 = new User
            {
                UserName = "Mr_Vanya",
                Birthday = "18.10.1999",
                Email = "vanya@ukr.net",
                PasswordHash = "vanya123",
                ConfirmPassword = "vanya123"
            };
            User user2 = new User
            {
                UserName = "Staham",
                Email = "Staham@ukr.net",
                PasswordHash = "staham123",
                ConfirmPassword = "staham123"
            };
            if (!context.Users.Any())
            {
                context.Users.Add(user1);
                context.Users.Add(user2);
                context.SaveChanges();
            }        

            Article article1 = new Article
            {
                Title = "test 1",
                Description = " test desc 1",
                User = user1
            };
            Article article2 = new Article
            {
                Title = "test 2",
                Description = " test desc 2",
                User = user2
            };
            if (!context.Articles.Any())
            {
                context.Articles.Add(article1);
                context.Articles.Add(article2);
                context.SaveChanges();
            }
            Comment comment1 = new Comment
            {
                Text = "comment 1",
                DateTime = "14.04.2022",
                User = user1,
                Article = article1
            };
            Comment comment2 = new Comment
            {
                Text = "comment 2",
                DateTime = "14.04.2022",
                User = user1,
                Article = article1
            };
            Comment comment3 = new Comment
            {
                Text = "comment 3",
                DateTime = "14.04.2022",
                User = user2,
                Article = article2
            };
            if (!context.Comments.Any())
            {
                context.Comments.Add(comment1);
                context.Comments.Add(comment2);
                context.Comments.Add(comment3);
                context.SaveChanges();
            }
        }
    }
}
