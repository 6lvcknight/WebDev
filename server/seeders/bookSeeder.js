import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book, Author, Genre, Publisher } from '../models/Book.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const genres = [
  { name: 'Fantasy', description: 'Literature set in imaginary universes often including magic and mythological elements' },
  { name: 'Science Fiction', description: 'Speculative fiction dealing with advanced technology, space exploration, and futuristic concepts' },
  { name: 'Mystery', description: 'Fiction dealing with the solution of a crime or the unraveling of secrets' },
  { name: 'Romance', description: 'Stories centered on romantic relationships and their development' },
  { name: 'Thriller', description: 'Fast-paced, tension-driven stories designed to excite the reader' },
  { name: 'Historical Fiction', description: 'Fiction set in the past, often during significant historical events' },
  { name: 'Biography', description: 'The story of a person\'s life written by someone else' },
  { name: 'Self-Help', description: 'Books aimed at personal improvement and development' }
];

const authors = [
  { name: 'J.K. Rowling', biography: 'British author best known for the Harry Potter series', birthDate: '1965-07-31', nationality: 'British' },
  { name: 'George R.R. Martin', biography: 'American novelist known for A Song of Ice and Fire', birthDate: '1948-09-20', nationality: 'American' },
  { name: 'Stephen King', biography: 'American author of horror, supernatural fiction, and suspense', birthDate: '1947-09-21', nationality: 'American' },
  { name: 'Agatha Christie', biography: 'English writer known for her detective novels', birthDate: '1890-09-15', nationality: 'British' },
  { name: 'Colleen Hoover', biography: 'American author who primarily writes romance novels', birthDate: '1979-12-11', nationality: 'American' }
];

const publishers = [
  { name: 'Penguin Random House', address: '1745 Broadway, New York, NY 10019', website: 'www.penguinrandomhouse.com' },
  { name: 'HarperCollins', address: '195 Broadway, New York, NY 10007', website: 'www.harpercollins.com' },
  { name: 'Simon & Schuster', address: '1230 Avenue of the Americas, New York, NY 10020', website: 'www.simonandschuster.com' },
  { name: 'Hachette Book Group', address: '1290 Avenue of the Americas, New York, NY 10104', website: 'www.hachettebookgroup.com' }
];

// Seeder function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Genre.deleteMany({});
    await Publisher.deleteMany({});

    console.log('Cleaned up existing data');

    // Create genres
    const createdGenres = await Genre.insertMany(genres);
    console.log(`${createdGenres.length} genres created`);

    // Create authors
    const createdAuthors = await Author.insertMany(authors);
    console.log(`${createdAuthors.length} authors created`);

    // Create publishers
    const createdPublishers = await Publisher.insertMany(publishers);
    console.log(`${createdPublishers.length} publishers created`);

    // Create users
    const users = [
      {
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'user'
      },
      {
        username: 'janedoe',
        email: 'jane.doe@example.com',
        password: 'password123',
        role: 'user'
      },
      {
        username: 'alexsmith',
        email: 'alex.smith@example.com',
        password: 'password123',
        role: 'user'
      }
    ];
    
    // Check if users already exist, if not create them
    let createdUsers = [];
    for (const userData of users) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create(userData);
        console.log(`User ${userData.username} created`);
      }
      createdUsers.push(user);
    }
    
    // Reference to first user for reviews
    const reviewUser = createdUsers[0];

    // Create books
    const books = [
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: createdAuthors[0]._id,
        coverImage: 'https://images.unsplash.com/photo-1606311698062-20df019767e9?q=80&w=400',
        publisher: createdPublishers[0]._id,
        isbn: '9780747532743',
        publishedDate: new Date('1997-06-26'),
        genres: [createdGenres[0]._id], // Fantasy
        description: 'The first novel in the Harry Potter series follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.',
        availableCopies: 50,
        language: 'English',
        pages: 223,
        reviews: [{
          userId: reviewUser._id,
          rating: 5,
          title: 'A magical beginning',
          content: 'This book started my love for reading. The world-building is incredible.',
          helpful: 24,
        }],
        reviewsCount: 1
      },
      {
        title: 'A Game of Thrones',
        author: createdAuthors[1]._id,
        coverImage: 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?q=80&w=400',
        publisher: createdPublishers[1]._id,
        isbn: '9780553103540',
        publishedDate: new Date('1996-08-01'),
        genres: [createdGenres[0]._id, createdGenres[5]._id], // Fantasy, Historical Fiction
        description: 'The first novel in A Song of Ice and Fire, the story of political and sexual intrigue between several families vying for the Iron Throne.',
        availableCopies: 35,
        language: 'English',
        pages: 694,
        reviews: [{
          userId: reviewUser._id,
          rating: 4,
          title: 'Epic but violent',
          content: 'Complex characters and intricate plot. Not for the faint-hearted.',
          helpful: 18,
        }],
        reviewsCount: 1
      },
      {
        title: 'The Shining',
        author: createdAuthors[2]._id,
        coverImage: 'https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80&w=400',
        publisher: createdPublishers[2]._id,
        isbn: '9780385121675',
        publishedDate: new Date('1977-01-28'),
        genres: [createdGenres[4]._id], // Thriller
        description: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.',
        availableCopies: 20,
        language: 'English',
        pages: 447,
        reviews: [],
        reviewsCount: 0
      },
      {
        title: 'Murder on the Orient Express',
        author: createdAuthors[3]._id,
        coverImage: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80&w=400',
        publisher: createdPublishers[0]._id,
        isbn: '9780007119318',
        publishedDate: new Date('1934-01-01'),
        genres: [createdGenres[2]._id], // Mystery
        description: 'Famous detective Hercule Poirot investigates a murder that occurred on the train he is traveling on.',
        availableCopies: 15,
        language: 'English',
        pages: 256,
        reviews: [{
          userId: reviewUser._id,
          rating: 5,
          title: 'A perfect mystery',
          content: 'One of Christie\'s best works with an incredible twist ending.',
          helpful: 42,
        }],
        reviewsCount: 1
      },
      {
        title: 'It Ends with Us',
        author: createdAuthors[4]._id,
        coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400',
        publisher: createdPublishers[3]._id,
        isbn: '9781501110368',
        publishedDate: new Date('2016-08-02'),
        genres: [createdGenres[3]._id], // Romance
        description: 'A heartbreaking story about love, overcoming trauma, and strength.',
        availableCopies: 45,
        language: 'English',
        pages: 384,
        reviews: [],
        reviewsCount: 0
      }
    ];
    
    const createdBooks = await Book.insertMany(books);
    console.log(`${createdBooks.length} books created`);

    console.log('Database successfully seeded!');
    
  } catch (error) {
    console.error('Database seeding failed:', error);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedDatabase();