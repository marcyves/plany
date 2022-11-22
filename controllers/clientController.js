const { client } = require("../models");

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
  getNames() {
    return this.Client.findAll();
  }

  /**
   * Get client information provided an id
   * @param {*} id
   */
  async getClient(id) {
    const oneClient = this.Client.findOne({ where: { clientId: id } });
    return oneClient;
  }
}

module.exports = ClientController;
