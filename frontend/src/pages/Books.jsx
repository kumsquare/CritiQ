import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }
  
        const response = await axios.get('http://localhost:5000/api/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("📚 Full Books API Response:", response.data); // Log full response
  
        if (Array.isArray(response.data.books)) {
          response.data.books.forEach(book => console.log("🔍 Book Object:", book));
          setBooks(response.data.books);
        } else {
          setError('The books data is not in an array format');
        }
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      }
    };
  
    fetchBooks();
  }, []);
  

  const deleteBook = async (book_id) => {
    console.log(`Attempting to delete book with ID:`, book_id);

    if (!book_id) {
      console.error("Book ID is undefined! Fix the delete button.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/books/${book_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setBooks(books.filter((book) => book._id !== book_id));  // <-- FIX HERE
      }
    } catch (err) {
      setError('Failed to delete the book');
      console.error('Error deleting book:', err);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-gray-900 text-xl font-medium mb-4">Books</h2>

        {error && <p className="text-red-500">{error}</p>}

        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id || book.id} className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>

              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  {book.title}
                </h2>
                <p className="leading-relaxed text-base">Author: {book.author}</p>
                <p className="leading-relaxed text-base">{book.description}</p>

                <button
  onClick={() => {
    console.log("Delete button clicked for book ID:", book.book_id);
    deleteBook(book.book_id);
  }}
  className="mt-4 text-red-500 hover:text-red-700"
>
  Delete Book
</button>



              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No books available</p>
        )}
      </div>
    </section>
  );
};

export default Books;
