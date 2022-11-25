
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        projectId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          clientId: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          budget: {
            type: DataTypes.FLOAT,
            allowNull: true
          },
          timeAllocated: {
            type: DataTypes.FLOAT,
            allowNull: true
          },
          realRate:{
            type: DataTypes.FLOAT,
            allowNull: false
          },
          period: {
            type: DataTypes.STRING,
            allowNull: true
          },
          year: {
            type: DataTypes.STRING,
            allowNull: false
          },
          startDate: {
            type: DataTypes.DATE,
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

    return Project;
};