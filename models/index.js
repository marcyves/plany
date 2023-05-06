const config = require("../config/db.config.js");
const {Sequelize, Op} = require("sequelize");

const logging = config.LOG === "true"?true:false;
const production = config.VERSION === "PROD"?true:false;

if (production){
  // MySQL Server Configuration
  var database = new Sequelize(config.DB, config.USER, config.PASSWORD, 
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
} else {
  // SQLite plus facile pour les tests
  //const database = new Sequelize('sqlite::memory', {logging: logging});
  var database = new Sequelize(`sqlite:${config.DB}.sqlite`, {logging: logging});
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = database;
db.Op = Op;

db.user = require("./User.js")(database, Sequelize.DataTypes);
db.client = require("./Client.js")(database, Sequelize.DataTypes);
db.project = require("./Project.js")(database, Sequelize.DataTypes);
db.task = require("./Task.js")(database, Sequelize.DataTypes);
db.planning = require("./Planning.js")(database, Sequelize.DataTypes);

// Ajout des relations
db.client.belongsTo(db.user);
db.user.hasMany(db.client, {foreignKey: 'userId'});

db.project.belongsTo(db.client);
db.client.hasMany(db.project, {foreignKey: 'clientId'});

db.task.belongsTo(db.project, {foreignKey: 'projectId'});
db.project.hasMany(db.task, {foreignKey: 'projectId'});

db.planning.belongsTo(db.task, {foreignKey: 'taskId'});
db.task.hasMany(db.planning, {foreignKey: 'taskId'});

module.exports = db;