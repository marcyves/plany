const db = require("../models");
const Client = db.client;

const projectController = require("../controllers/projectController.js");
const taskController = require("../controllers/taskController.js");

/**
 * Returns a list of clients
 */
exports.getNames = (req, res) => {
  return Client.findAll();
}

/**
 * Returns the list of clients for a user
 */
exports.getClientsByUser = (id) => {
  return Client.findAll({ where: { userId: id } });
}

/**
 * Returns a list of clients
 */
exports.getClientDetails = (req, res) => {
  return Client.findAll({ include: this.Project });
}

/**
 * Returns the list of clients for a user
 */
exports.getClientDetailsByUser = (id, year) => {

    return Client.findAll({ include: [{
                                        model: db.project,
                                        include: [{
                                          model: db.projectDetails,
                                          where: {year: year}
                                          }]
                                    }],
                                      where: { userId: id},
                                      order: [['name', 'ASC'],[db.project, 'name', 'ASC']]
                          });
}

/**
 * Get client information provided an id
 * @param {*} id
 */
exports.getClient = (id) => {
  return Client.findOne({ where: { clientId: id } });
}

/**
 * 
 * @returns 
 */
exports.RouteByYear = async (request, response) => {

    const years = [2021, 2022, 2023];

    if(request.query.year)
    {
        var currentYear = request.query.year;
    }else{
        var currentYear = new Date().getFullYear();
    }
    console.log(`=== Preparing route for ${currentYear} and user ${response.locals.user_id}`);

    const clients = await this.getClientDetailsByUser(response.locals.user_id, currentYear);
    const tasks = await taskController.getTasks();
    var all_clients = await this.getNames();
    clients.forEach(element => {
      all_clients = all_clients.filter( (client) => {
        return client.clientId != element.clientId;
      })
    });

    return response.render('layout', { 
      pageTitle: 'My Clients',
      template: 'clients_full',
      clients,
      years,
      currentYear,
      all_clients,
      tasks });
}

/**
 * 
 */
exports.RouteById = async (request, response) => {

  const client_details = await this.getClient(request.params.id);

  if (client_details){
      const projects = await projectController.getProjectsForClient(request.params.id);
      return response.render('layout', { pageTitle: 'Client Details', template: 'client_details', client_details, projects});    
  } else {
      return response.render('layout', { pageTitle: 'Lost', template: '404' });
  }

}
