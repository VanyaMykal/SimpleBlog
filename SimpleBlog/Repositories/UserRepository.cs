using SimpleBlog.Context.Models;
using SimpleBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly BlogContext context;
        public UserRepository(BlogContext context)
        {
            this.context = context;
        }
        public User Create(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }
        public User GetUserByEmail(string email)
        {
            return context.Users.FirstOrDefault(x=>x.Email == email);
        }
        public User GetUserByName(string name)
        {
            return context.Users.FirstOrDefault(x=>x.UserName == name);
        }
        public User GetUserById(string id)
        {
            return context.Users.FirstOrDefault(x => x.Id == id);
        }
    }
}
