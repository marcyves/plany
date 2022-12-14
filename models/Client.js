const Project = require('./Project');

module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        clientId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          defaultRate:{
            type: DataTypes.FLOAT,
            allowNull: true
          }
        },{
            // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
            timestamps: false,
            // Pas de createdAt
            createdAt: false,
            // Pas de updatedAt
            updatedAt: false,
    });

    //    Client.hasMany(Project, {foreignKey: 'clientId'});

    return Client;
};