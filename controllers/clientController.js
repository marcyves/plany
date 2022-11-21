/**
 * Logic for fetching clients information
 */
class ClientController {

  constructor(clientModel) {
    this.Client = clientModel;
}

/**
 * Returns a list of clients
 */
 getNames(){
  return this.Client.findAll(
  );
}

  /**
   * Get client information provided an id
   * @param {*} id
   */
  async getClient(id) {
    return this.Client.findOne({
      where: {clientId: id}
    }
      );
  }
}

module.exports = ClientController;
