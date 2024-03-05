'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usermessages extends Model {
    static associate(models) {
      
      usermessages.belongsTo(models.UserAccount, { foreignKey: 'userId' });
    }
  }
  usermessages.init({
    userId: DataTypes.INTEGER, 
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usermessages',
  });
  return usermessages;
};