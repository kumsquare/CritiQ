import express from 'express';
import  Favourite  from '../model/favourites.mjs';
import auth from '../middleware/auth.mjs';

const favouriteRouter = express.Router();

// Add a book to favourites
favouriteRouter.post('/add', auth, async (req, res) => {
    try {
        console.log("Decoded User Data:", req.user); // 🔍 Debugging log

        const { bookId } = req.body;
        if (!bookId) {
            return res.status(400).json({ error: "Book ID is required" });
        }

        // Extract userId from token
        const userId = req.user ? req.user.user_id : null;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        console.log(`User ID: ${userId}, Book ID: ${bookId}`); // 🔍 Debugging log

        // Check if book is already in favourites
        const existingFavourite = await Favourite.findOne({ where: { userId, bookId } });
        if (existingFavourite) {
            return res.status(400).json({ message: 'Book already in favourites' });
        }

        // Add book to favourites
        const favourite = await Favourite.create({ userId, bookId });
        res.status(201).json({ message: 'Book added to favourites', favourite });

    } catch (err) {
        console.error("Error Adding to Favourites:", err);  // 🔍 Debugging log
        res.status(500).json({ error: err.message });
    }
});

// Get all favourites
favouriteRouter.get('/', auth, async (req, res) => {
    try {
        console.log("User ID from Token:", req.user.user_id); // ✅ Debugging log

        const userId = req.user ? req.user.user_id : null;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        const favourites = await Favourite.findAll({ where: { userId } });
        res.status(200).json({ favourites });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Remove a book from favourites
favouriteRouter.delete('/remove/:id', auth, async (req, res) => {
    try {
        const userId = req.user ? req.user.user_id : null;  // ✅ Correct userId extraction
        const bookId = req.params.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: User ID not found" });
        }

        console.log("Deleting Favourite - UserID:", userId, "BookID:", bookId); // ✅ Debugging

        const favourite = await Favourite.findOne({ where: { userId, bookId } });

        if (!favourite) {
            return res.status(404).json({ message: 'Book not found in favourites' });
        }

        await favourite.destroy();
        res.status(200).json({ message: 'Book removed from favourites' });
    } catch (err) {
        console.error("Error in Removing Favourite:", err); // ✅ Debugging
        res.status(500).json({ error: err.message });
    }
});

export default favouriteRouter;
