module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Clients', {
        clientId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            // Ne pas ajouter les attributs timestamps (updatedAt, createdAt)
            timestamps: false,
            // Pas de createdAt
            createdAt: false,
            // Pas de updatedAt
            updatedAt: false,
    });

    //    Client.hasMany(Project, {foreignKey: 'clientId'});

    return Client;
};