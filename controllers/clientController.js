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
        return  { id: 0,
            title: "non trouvé",
            band: "",
            image: "pic01"};
    }
  }

module.exports = ClientController;
