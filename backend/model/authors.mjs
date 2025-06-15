import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';

const Author = sequelize.define('Author', {
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false, // Disable automatic handling of `createdAt` and `updatedAt`
});

// Define the associate method inside the model
Author.associate = (models) => {
  Author.hasMany(models.Book, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
  });
};

// Export the model after defining the associate method
export default Author;
