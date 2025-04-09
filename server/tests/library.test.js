import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import libraryRoutes from '../routes/library.js';
import { Book } from '../models/Book.js';

const app = express();
app.use(express.json());
app.use('/api/library', libraryRoutes);

describe('Library API Routes', () => {
    // Sample book data for testing
    const sampleBook = {
      title: 'Test Book',
      author: '65ff1234b5e7890a123b4567',  // Sample ObjectId
      publisher: '65ff1234b5e7890a123b4568', // Sample ObjectId
      isbn: '1234567890123',
      publishedDate: new Date('2023-01-01'),
      genres: ['65ff1234b5e7890a123b4569'], // Sample ObjectId array
      description: 'A test book description',
      pageCount: 200,
      language: 'English',
      availableCopies: 10,
      totalCopies: 10
    };

    describe('GET /api/library', () => {
        it('should get all books', async () => {
            // Add a test book to the database
            await new Book(sampleBook).save();
            
            const response = await request(app).get('/api/library');
            
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(1);
            expect(response.body[0].title).toBe('Test Book');
        });
    });

    describe('POST /api/library', () => {
        it('should create a new book', async () => {
            const response = await request(app)
                .post('/api/library')
                .send(sampleBook);
            
            expect(response.status).toBe(201);
            expect(response.body.title).toBe('Test Book');
            
            // Verify book was saved to database
            const books = await Book.find();
            expect(books.length).toBe(1);
        });
    
        it('should return 500 if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/library')
                .send({ title: 'Incomplete Book' });
            
            expect(response.status).toBe(500);
        });
    });

    describe('GET /api/library/books/:id', () => {
        it('should get a book by ID', async () => {
            // Add a test book and get its ID
            const newBook = await new Book(sampleBook).save();
            
            const response = await request(app)
                .get(`/api/library/books/${newBook._id}`);
            
            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Test Book');
        });
    
        it('should return 404 for non-existent book', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            
            const response = await request(app)
                .get(`/api/library/books/${fakeId}`);
            
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/library/books/:id', () => {
        it('should update a book', async () => {
            const newBook = await new Book(sampleBook).save();
            
            const response = await request(app)
                .put(`/api/library/books/${newBook._id}`)
                .send({ title: 'Updated Book Title' });
            
            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Updated Book Title');
            
            // Verify update in database
            const updatedBook = await Book.findById(newBook._id);
            expect(updatedBook.title).toBe('Updated Book Title');
        });
    });

    describe('DELETE /api/library/books/:id', () => {
        it('should delete a book', async () => {
            const newBook = await new Book(sampleBook).save();
            
            const response = await request(app)
                .delete(`/api/library/books/${newBook._id}`);
            
            expect(response.status).toBe(200);
            
            // Verify book was deleted
            const book = await Book.findById(newBook._id);
            expect(book).toBeNull();
        });
    });
});
