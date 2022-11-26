module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      taskName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      steps: {
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

  return Task;
};
