import express from 'express';
import Review from '../model/reviews.mjs';
import auth from '../middleware/auth.mjs';

const reviewRouter = express.Router();

// Get all reviews
reviewRouter.get('/', auth, async (req, res) => {
    try {
        const reviews = await Review.findAll();
        console.log(reviews);
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get reviews for a specific book
reviewRouter.get('/book/:bookId', async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { book_id: req.params.bookId } });
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get reviews by a specific user
reviewRouter.get('/user/:userId', async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { user_id: req.params.userId } });
        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete a review (Only the user who created it or admin)
reviewRouter.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default reviewRouter;

