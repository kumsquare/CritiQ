import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';
import User from './users.mjs';
import Book from './books.mjs';

const Favourite = sequelize.define('Favourite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Favourite.associate = (models) => {
  Favourite.belongsTo(models.User, {
    foreignKey: 'userId',
  });
  Favourite.belongsTo(models.Book, {
    foreignKey: 'bookId',
  });
};

export default Favourite;