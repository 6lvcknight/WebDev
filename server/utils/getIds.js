import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book } from '../models/Book.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/booknest')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Get all book IDs and titles
    const books = await Book.find({}, '_id title');
    console.log('\nBOOKS:');
    books.forEach(book => {
      console.log(`${book.title}: ${book._id}`);
    });
    
    // Get all author IDs and names
    const authors = await mongoose.model('Author').find({}, '_id name');
    console.log('\nAUTHORS:');
    authors.forEach(author => {
      console.log(`${author.name}: ${author._id}`);
    });
    
    // Get all genre IDs and names
    const genres = await mongoose.model('Genre').find({}, '_id name');
    console.log('\nGENRES:');
    genres.forEach(genre => {
      console.log(`${genre.name}: ${genre._id}`);
    });
    
    // Get all publisher IDs and names
    const publishers = await mongoose.model('Publisher').find({}, '_id name');
    console.log('\nPUBLISHERS:');
    publishers.forEach(publisher => {
      console.log(`${publisher.name}: ${publisher._id}`);
    });
    
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });