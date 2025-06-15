
import Author from './authors.mjs';
import Book from './books.mjs';
import User from './users.mjs';
import Favourite from './favourites.mjs';
import Review from './reviews.mjs';

// Define associations here

// Book -> Author (Many books belong to one author)
Book.belongsTo(Author, { foreignKey: 'author_id' });

// Author -> Book (One author can have many books)
Author.hasMany(Book, { foreignKey: 'author_id' });

// One-to-many relationship between User and Favourites
User.hasMany(Favourite, { foreignKey: 'user_id' });
Favourite.belongsTo(User, { foreignKey: 'user_id' });

// One-to-many relationship between Book and Favourites
Book.hasMany(Favourite, { foreignKey: 'book_id' });
Favourite.belongsTo(Book, { foreignKey: 'book_id' });

// Set up associations
User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Book.hasMany(Review, { foreignKey: 'book_id' });
Review.belongsTo(Book, { foreignKey: 'book_id' });

export default () => {
  console.log('Associations have been set up');
};
export { Author, Book ,Review,User,Favourite };