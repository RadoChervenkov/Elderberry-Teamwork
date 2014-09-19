using ElderberryLottery.Services.Models;
using ElderberryLotttery.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ElderberryLottery.Services.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class AdminController : ApiController
    {
        private IElderberryLotteryData data;

        public AdminController(IElderberryLotteryData data)
        {
            this.data = data;
        }

        // GET: Api/Admin/AddCode
        [HttpPost]
        public IHttpActionResult AddCode()
        {
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult AllCodes()
        {
            var allCodes = this.data.GameCodes.All().ToList();
            return Ok(allCodes);
        }

        [HttpGet]
        public IHttpActionResult AllUsers()
        {
            var allUsers = this.data.Users.All().ToList();
            return Ok(allUsers);
        }

        [HttpDelete]
        public IHttpActionResult DeleteUser(DeleteUserModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            var userToDelete = this.data.Users.All().FirstOrDefault(u => u.UserName == user.UserName);

            if (userToDelete == null)
            {
                return BadRequest();
            }

            this.data.Users.Delete(userToDelete);
            this.data.SaveChanges();

            return Ok();
        }
    }
}