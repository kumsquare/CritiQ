import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';
import User from './users.mjs';
import Book from './books.mjs';

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    field: 'user_id',
},
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
    field: 'book_id',
},
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review_text: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    onUpdate: Sequelize.NOW, // Automatically update this field on record updates
  },
}, {
  timestamps: false, // If you're managing the timestamps manually (e.g., using 'created_at' and 'updated_at')
});


export default Review;
