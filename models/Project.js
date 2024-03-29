module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Projects', {
        projectId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        },{
            // Ne pas ajouter les attributs timestamps (updatedAt, createdAt)
            timestamps: false,
            // Pas de createdAt
            createdAt: false,
            // Pas de updatedAt
            updatedAt: false,
    });

    return Project;
};