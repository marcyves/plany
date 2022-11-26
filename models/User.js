const Client = require('./client');

module.exports = (sequelize, DataTypes) => {
  
    const User = sequelize.define("user", {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pwdDatetime: {
        type: DataTypes.DATE,
      },
      level: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment:  '1 = dealer, 2 = administrator'
      },
      CMR: {
        type: DataTypes.TINYINT,
      }
    },{
    // Ne pas ajouter les attibuts timestamps (updatedAt, createdAt)
    timestamps: false,
    // Pas de createdAt
    createdAt: false,
    // Pas de updatedAt
    updatedAt: false,
  });
  
//    User.hasMany(Client, {foreignKey: 'userId'});

    return User;
  };