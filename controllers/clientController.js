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
   * Returns a list of clients
   */
   async getFullDetails() {
    return await this.Client.findAll({ include: this.Project });
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
