/**
 * Logic for fetching clients information
 */
class UserController {

  constructor(db) {
    this.db = db;
  }

  /**
   * Returns a list of users
   */
  async getUsers() {
    return await this.db.client.findAll();
  }


  /**
   * Returns a User
   */
   async getUser(email) {
    return await this.db.user.findOne({ where: { email: email }});
  }

  async create(user) {
    console.log(user);
    return false;
    if (user){
      this.User.create(user);
      return true;
    }else{
      return false;
    }
  }
}

module.exports = UserController;
