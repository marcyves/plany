/**
 * Logic for fetching clients information
 */
class ClientController {
  constructor(clientModel, projectModel) {
    this.Client = clientModel;
    this.Project = projectModel;
  }

  /**
   * Returns a list of clients
   */
  async getNames() {
    return await this.Client.findAll();
  }

  /**
   * Returns the list of clients for a user
   */
  async getClientsByUSer(id) {
    return await this.Client.findAll({ where: { userId: id } });
  }

  /**
   * Returns a list of clients
   */
  async getClientDetails() {
    return await this.Client.findAll({ include: this.Project });
  }

    /**
   * Returns the list of clients for a user
   */
     async getClientDetailsByUser(id) {
      return await this.Client.findAll({ include: this.Project, where: { userId: id }  });
    }
  
  /**
   * Get client information provided an id
   * @param {*} id
   */
  async getClient(id) {
    const oneClient = await this.Client.findOne({ where: { clientId: id } });
    return oneClient;
  }
}

module.exports = ClientController;
