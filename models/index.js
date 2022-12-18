const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const db = {};

const logging = config.SQL_LOGGING === "true"?true:false;

/*   

  // MySQL Server Configuration
  const database = new Sequelize(config.DB, config.USER, config.PASSWORD, 
    {
    host: config.HOST,
    dialect: config.dialect,
    logging: logging,                     // true pour avoir le détail des requêtes SQL
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }); 

*/

  // SQLite plus facile pour les tests
  //const database = new Sequelize('sqlite::memory', {logging: logging});
  const database = new Sequelize('sqlite:planner.sqlite', {logging: logging});

  db.Sequelize = Sequelize;
  db.sequelize = database;

  db.user = require("./User.js")(database, Sequelize.DataTypes);
  db.client = require("./Client.js")(database, Sequelize.DataTypes);
  db.project = require("./Project.js")(database, Sequelize.DataTypes);
  db.task = require("./Task.js")(database, Sequelize.DataTypes);

  // Ajout des relations
  db.client.belongsTo(db.user);
  db.user.hasMany(db.client, {foreignKey: 'userId'});

  db.project.belongsTo(db.client);
  db.client.hasMany(db.project, {foreignKey: 'clientId'});

  db.task.belongsTo(db.project, {foreignKey: 'projectId'});
  db.project.hasMany(db.task, {foreignKey: 'projectId'});


module.exports = db;