import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.mjs';
import Author from './authors.mjs';

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  published_year: {
    type: DataTypes.INTEGER,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Ensure Sequelize knows this field is required
    references: {
      model: Author,
      key: 'author_id',
    },
  },
}, {
  timestamps: true,        
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Define the associate method inside the model
Book.associate = (models) => {
  Book.belongsTo(models.Author, {
    foreignKey: 'author_id',
  });
};


export default Book;
