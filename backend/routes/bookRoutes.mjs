import express from 'express';
import  Book  from '../model/books.mjs';
import auth from '../middleware/auth.mjs';

const bookRouter = express.Router();

// Create a new book
bookRouter.post('/create', auth, async (req, res) => {
    try {
        const { title, description, publicationYear, author_id } = req.body;
        const newBook = await Book.create({ title, description, publicationYear, author_id });
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all books
bookRouter.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get book by ID
bookRouter.get('/:id', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update book
bookRouter.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, publicationYear, author_id } = req.body;
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await book.update({ title, description, publicationYear, author_id });
        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a book by ID
bookRouter.delete('/:id', auth, async (req, res) => {
    try {
        // Find the book by its ID
        const book = await Book.findByPk(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Delete the book
        await book.destroy();
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default bookRouter;
