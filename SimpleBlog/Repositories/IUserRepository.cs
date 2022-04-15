using SimpleBlog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleBlog.Repositories
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetUserByEmail(string email);
        User GetUserByName(string name);
        User GetUserById(string id);
    }
}
