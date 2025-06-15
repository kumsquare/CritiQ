import Author from './authors.mjs';
import Book from './books.mjs';

const initializeModels = () => {
  // Initialize associations between Author and Book
  Author.associate({ Book });
  Book.associate({ Author });
};

export default initializeModels;
