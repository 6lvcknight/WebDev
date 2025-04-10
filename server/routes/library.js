import express from 'express';
import mongoose from 'mongoose';
import { Book, Author, Genre } from '../models/Book.js';
const router = express.Router();


// GET REQUESTS
// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
            .populate('author')
            .populate('publisher')
            .populate('genres');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get books by search query
router.get('/books/search', async (req, res) => {
    const { title, author, genre } = req.query;
    try {
        const query = {};
        if (title) query.title = { $regex: title, $options: 'i' };
        if (author) query.author = { $regex: author, $options: 'i' };
        if (genre) query.genre = { $regex: genre, $options: 'i' };
        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get books recently added
router.get('/books/recent', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4)
            .populate('author')
            .populate('publisher') 
            .populate('genres');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get featured books
router.get('/books/featured', async (req, res) => {
    try {
        const books = await Book.find()
            .sort({ reviewsCount: -1 })
            .limit(4)
            .populate('author')
            .populate('publisher') 
            .populate('genres');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single book by ID
router.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        const bookItem = await Book.findById(id)
            .populate('author')
            .populate('publisher') 
            .populate('genres')
            .populate('reviews.userId');
        if (!bookItem) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(bookItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// POST REQUESTS
// Post a new book
router.post('/', async (req, res) => {
    const newBook = new Book(req.body);
    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Post a book review 
router.post('/books/:id/reviews', async (req, res) => {
    const { userId, reviewText, rating } = req.body;
    try {
        const bookItem = await Book.findById(req.params.id);
        if (!bookItem) return res.status(404).json({ message: 'Book not found' });
        bookItem.reviews.push({ 
            userId, 
            title, 
            content,
            rating 
        });
        
        bookItem.reviewsCount = bookItem.reviews.length;

        await bookItem.save();
        res.status(201).json(bookItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT/PATCH REQUESTS
// Update a book
router.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE REQUESTS
// Delete a book
router.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(deletedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete a book review
router.delete('/books/:id/reviews/:reviewId', async (req, res) => {
    const { id, reviewId } = req.params;
    try {
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: 'Invalid review ID format' });
        }
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        // Find the review index
        const reviewIndex = book.reviews.findIndex(review => 
            review._id.toString() === reviewId);
        
        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Remove the review and save the book
        book.reviews.splice(reviewIndex, 1);
        await book.save();
        res.status(200).json({ message: 'Review deleted successfully', book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get author by id
router.get('/authors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid author ID format' });
        }
        const author = await Author.findById(id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get publisher by id
router.get('/publishers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid publisher ID format' });
        }
        const publisher = await Publisher.findById(id);
        if (!publisher) return res.status(404).json({ message: 'Publisher not found' });
        res.status(200).json(publisher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// get genre by id
router.get('/genres/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid genre ID format' });
        }
        const genre = await Genre.findById(id);
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router