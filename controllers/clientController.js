/**
 * Logic for fetching clients information
 */
class ClientController {
  constructor(db) {
    this.db = db;
  }

  /**
   * Returns a list of clients
   */
  async getNames() {
    return await this.db.client.findAll();
  }

  /**
   * Returns the list of clients for a user
   */
  async getClientsByUSer(id) {
    return await this.db.client.findAll({ where: { userId: id } });
  }

  /**
   * Returns a list of clients
   */
  async getClientDetails() {
    return await this.db.client.findAll({ include: this.Project });
  }

    /**
   * Returns the list of clients for a user
   */
     async getClientDetailsByUser(id, year) {
      return await this.db.client.findAll({ include: [{
                                                    model: this.db.project,
                                                    where: {year: year}
                                                  }],
                                           where: { userId: id},
                                           order: [[this.db.project, 'name', 'ASC']]
                                        });
    }
  
  /**
   * Get client information provided an id
   * @param {*} id
   */
  async getClient(id) {
    const oneClient = await this.db.client.findOne({ where: { clientId: id } });
    return oneClient;
  }
}

module.exports = ClientController;
