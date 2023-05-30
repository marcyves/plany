module.exports = (sequelize, DataTypes) => {
    const client_user = sequelize.define('client_user', {});

    return client_user;
};