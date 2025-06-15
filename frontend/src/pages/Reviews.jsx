import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/reviews', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else {
          setError('The reviews data is not in an array format');
        }
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  // Function to handle the delete request
  const deleteReview = async (review_id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/reviews/${review_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove the deleted review from the state
        setReviews(reviews.filter((review) => review.id !== review_id));
      }
    } catch (err) {
      setError('Failed to delete the review');
      console.error('Error deleting review:', err);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-gray-900 text-xl font-medium mb-4">Reviews</h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Render reviews dynamically */}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>

              <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  Book ID: {review.book_id}
                </h2>
                <p className="leading-relaxed text-base">Rating: {review.rating} / 5</p>
                <p className="leading-relaxed text-base">{review.review_text}</p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteReview(review.id)}
                  className="mt-4 text-red-500 hover:text-red-700"
                >
                  Delete Review
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available</p>
        )}

      </div>
    </section>
  );
};

export default Reviews;
