module.exports = (sequelize, DataTypes) => {
  const Planning = sequelize.define(
    "Planning",
    {
      planningId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
      timestamps: false,
      // Pas de createdAt
      createdAt: false,
      // Pas de updatedAt
      updatedAt: false,
    }
  );

  return Planning;
};
