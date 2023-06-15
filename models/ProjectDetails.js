module.exports = (sequelize, DataTypes) => {
    const ProjectDetails = sequelize.define('ProjectDetails', {
        projectDetailsId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            // Ne pas ajouter les attributs timestamps (updatedAt, createdAt)
            timestamps: false,
            // Pas de createdAt
            createdAt: false,
            // Pas de updatedAt
            updatedAt: false,
    });

    return ProjectDetails;
};