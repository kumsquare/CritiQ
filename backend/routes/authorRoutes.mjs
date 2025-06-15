import express from 'express';
import  author  from '../model/authors.mjs';
import auth from '../middleware/auth.mjs';
import Author from '../model/authors.mjs';
const authorRouter = express.Router();

// Create a new author
authorRouter.post('/create', auth, async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newAuthor = await author.create({ name, bio });
        res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all authors
authorRouter.get('/', async (req, res) => {
    try {
        const authors = await author.findAll();
        res.status(200).json({ authors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get author by ID
authorRouter.get('/:id', async (req, res) => {
    try {
        // Find the author by primary key (author_id)
        const author = await Author.findByPk(req.params.id);

        // If no author is found, return a 404 error
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Return the found author
        res.status(200).json({ author });
    } catch (err) {
        // Catch any errors and send a response
        res.status(500).json({ error: err.message });
    }
});


// Update author
authorRouter.put('/:id', auth, async (req, res) => {
    try {
        const { name, bio } = req.body;
        const author = await author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        await author.update({ name, bio });
        res.status(200).json({ message: 'Author updated successfully', author });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete author
authorRouter.delete('/:id', auth, async (req, res) => {
    try {
        const author = await author.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        await author.destroy();
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default authorRouter;
