/**
 * Logic for fetching clients information
 */
class UserController {

  constructor(clientModel, userModel) {
    this.Client = clientModel;
    this.User = userModel;
  }

  /**
   * Returns a list of users
   */
  async getUsers() {
    return await this.Client.findAll();
  }


  /**
   * Returns a User
   */
   async getUser(email) {
    return await this.User.findOne({ where: { email: email }});
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
