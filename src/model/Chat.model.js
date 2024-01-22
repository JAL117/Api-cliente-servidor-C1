const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Room = require('./Room');

class Message extends Model {}

Message.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
  }
);

Message.associate = function (models) {
  Message.belongsTo(models.User, {
    foreignKey: 'senderId',
    as: 'sender',
  });
  Message.belongsTo(models.Room, {
    foreignKey: 'roomId',
    as: 'room',
  });
};

module.exports = Message;