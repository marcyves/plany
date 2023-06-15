const config = require("../config/db.config.js");
const { Sequelize, Op } = require("sequelize");

const logging = config.SQL_LOGGING === "true" ? console.log : false;
const version = config.VERSION;

switch (version) {
  case "planetscale":
    var database = new Sequelize(config.DATABASE_URL, {
      logging: logging,
      dialectOptions: {
        ssl: { rejectUnauthorized: true },
      },
    });
    break;
  case "prod":
    // MySQL Server Configuration
    var database = new Sequelize(config.DB, config.USER, config.PASSWORD, {
      host: config.HOST,
      dialect: config.dialect,
      logging: logging, // true pour avoir le détail des requêtes SQL
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
    });
    break;
  case "dev":
    // SQLite plus facile pour les tests
    //const database = new Sequelize('sqlite::memory', {logging: logging});
    var database = new Sequelize(`sqlite:${config.DB}.sqlite`, {
      logging: logging,
    });
    break;
  default:
    console.log(`Sorry, there is no version ${version}.`);
}
console.log(`== Connected to version: ${version}`);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = database;
db.Op = Op;

db.user = require("./User.js")(database, Sequelize.DataTypes);
db.client = require("./Client.js")(database, Sequelize.DataTypes);
db.project = require("./Project.js")(database, Sequelize.DataTypes);
db.projectDetails = require("./ProjectDetails.js")(database, Sequelize.DataTypes);
db.task = require("./Task.js")(database, Sequelize.DataTypes);
db.planning = require("./Planning.js")(database, Sequelize.DataTypes);

// Ajout des relations
if (version == "planetscale") {

  db.client.belongsTo(db.user, {constraints: false, foreignKey: "userId" });
  db.project.belongsTo(db.client, {constraints: false, foreignKey: "clientId" });
  db.projectDetails.belongsTo(db.project, {constraints: false, foreignKey: "projectId" });
  db.task.belongsTo(db.project, { foreignKey: "projectId", constraints: false,});
  db.planning.belongsTo(db.task, { foreignKey: "taskId", constraints: false,});

  db.user.hasMany(db.client, { foreignKey: "userId", constraints: false, });
  db.client.hasMany(db.project, { foreignKey: "clientId", constraints: false, });
  db.project.hasMany(db.projectDetails, { foreignKey: "projectId", constraints: false, });
  db.project.hasMany(db.task, { foreignKey: "projectId", constraints: false, });
  db.task.hasMany(db.planning, { foreignKey: "taskId", constraints: false, });
} else {
  db.client.belongsTo(db.user, { foreignKey: "userId" });
  db.project.belongsTo(db.client, { foreignKey: "clientId" });
  db.projectDetails.belongsToMany(db.project, {through: "projectId" });
  db.task.belongsTo(db.project, { foreignKey: "projectId" });
  db.planning.belongsTo(db.task, { foreignKey: "taskId" });

  db.user.hasMany(db.client, { foreignKey: "userId" });
  db.client.hasMany(db.project, { foreignKey: "clientId" });
  db.project.hasMany(db.projectDetails, { foreignKey: "projectId"});
  db.project.hasMany(db.task, { foreignKey: "projectId" });
  db.task.hasMany(db.planning, { foreignKey: "taskId" });
}

module.exports = db;
