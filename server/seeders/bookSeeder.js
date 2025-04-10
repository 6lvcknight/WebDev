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
  { name: 'Self-Help', description: 'Books aimed at personal improvement and development' },
  { name: 'Non-Fiction', description: 'Based on factual information, real people, and real events' },
  { name: 'Horror', description: 'Designed to frighten, scare, or disgust the reader' },
  { name: 'Poetry', description: 'Literary work with rhythmic and metaphorical language' },
  { name: 'Young Adult', description: 'Targeted towards teenage readers with coming-of-age themes' }
];

const authors = [
  { name: 'J.K. Rowling', biography: 'British author best known for the Harry Potter series', birthDate: '1965-07-31', nationality: 'British' },
  { name: 'George R.R. Martin', biography: 'American novelist known for A Song of Ice and Fire', birthDate: '1948-09-20', nationality: 'American' },
  { name: 'Stephen King', biography: 'American author of horror, supernatural fiction, and suspense', birthDate: '1947-09-21', nationality: 'American' },
  { name: 'Agatha Christie', biography: 'English writer known for her detective novels', birthDate: '1890-09-15', nationality: 'British' },
  { name: 'Colleen Hoover', biography: 'American author who primarily writes romance novels', birthDate: '1979-12-11', nationality: 'American' },
  { name: 'Margaret Atwood', biography: 'Canadian author known for speculative fiction including *The Handmaid’s Tale*', birthDate: '1939-11-18', nationality: 'Canadian' },
  { name: 'Neil Gaiman', biography: 'British author of novels, short stories, graphic novels, and films', birthDate: '1960-11-10', nationality: 'British' },
  { name: 'Maya Angelou', biography: 'American memoirist, poet, and civil rights activist', birthDate: '1928-04-04', nationality: 'American' },
  { name: 'Rick Riordan', biography: 'American author of fantasy fiction including the *Percy Jackson* series', birthDate: '1964-06-05', nationality: 'American' }
];

const publishers = [
  { name: 'Penguin Random House', address: '1745 Broadway, New York, NY 10019', website: 'www.penguinrandomhouse.com' },
  { name: 'HarperCollins', address: '195 Broadway, New York, NY 10007', website: 'www.harpercollins.com' },
  { name: 'Simon & Schuster', address: '1230 Avenue of the Americas, New York, NY 10020', website: 'www.simonandschuster.com' },
  { name: 'Hachette Book Group', address: '1290 Avenue of the Americas, New York, NY 10104', website: 'www.hachettebookgroup.com' },
  { name: 'Scholastic', address: '557 Broadway, New York, NY 10012', website: 'www.scholastic.com' },
  { name: 'Bloomsbury Publishing', address: '50 Bedford Square, London WC1B 3DP, UK', website: 'www.bloomsbury.com' }
];

// Seeder function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Genre.deleteMany({});
    await Publisher.deleteMany({});
    await User.deleteMany({});

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

    // Create books
    const books = [
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        author: createdAuthors[0]._id,
        coverImage: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[0]._id,
        isbn: '9780747532743',
        publishedDate: new Date('1997-06-26'),
        genres: [createdGenres[0]._id], 
        description: 'The first novel in the Harry Potter series follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.',
        availableCopies: 50,
        language: 'English',
        pages: 223,
        reviews: [{
          userId: createdUsers[0]._id,
          rating: 5,
          title: 'A magical beginning',
          content: 'This book started my love for reading. The world-building is incredible.',
          helpful: 24,
        },
        {
          userId: createdUsers[2]._id,
          rating: 4,
          title: 'Unexpectedly gripping',
          content: 'Didn’t expect to enjoy it this much. The pacing and details kept me hooked!',
          helpful: 17,
        },
        {
          userId: createdUsers[1]._id,
          rating: 3,
          title: 'Good but slow',
          content: 'The plot was decent, but it dragged in the middle.',
          helpful: 9
        },
        {
          userId: createdUsers[2]._id,
          rating: 4,
          title: 'Loved the characters',
          content: 'The characters felt so real and relatable.',
          helpful: 14
        },
        {
          userId: createdUsers[1]._id,
          rating: 5,
          title: 'A must-read',
          content: 'One of the best books I’ve read this year!',
          helpful: 33
        },
        {
          userId: createdUsers[0]._id,
          rating: 2,
          title: 'Not my style',
          content: 'Too confusing for me. The story was all over the place.',
          helpful: 6
        },
      ],
        reviewsCount: 6
      },
      {
        title: 'A Game of Thrones',
        author: createdAuthors[1]._id,
        coverImage: 'https://images.unsplash.com/photo-1602748113791-19ffc2be8f46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[1]._id,
        isbn: '9780553103540',
        publishedDate: new Date('1996-08-01'),
        genres: [createdGenres[0]._id, createdGenres[5]._id], 
        description: 'The first novel in A Song of Ice and Fire, the story of political and sexual intrigue between several families vying for the Iron Throne.',
        availableCopies: 35,
        language: 'English',
        pages: 694,
        reviews: [{
          userId: createdUsers[0]._id,
          rating: 4,
          title: 'Epic but violent',
          content: 'Complex characters and intricate plot. Not for the faint-hearted.',
          helpful: 18,
        },
        {
          userId: createdUsers[2]._id,
          rating: 4,
          title: 'Engaging and clever',
          content: 'Loved the plot twists and the writing style.',
          helpful: 18
        },
        {
          userId: createdUsers[1]._id,
          rating: 5,
          title: 'Inspirational',
          content: 'Made me cry and reflect. Beautifully written.',
          helpful: 26
        },
        {
          userId: createdUsers[0]._id,
          rating: 3,
          title: 'Decent read',
          content: 'Enjoyable but not super memorable.',
          helpful: 11
        }
        ],
        reviewsCount: 4
      },
      {
        title: 'The Shining',
        author: createdAuthors[2]._id,
        coverImage: 'https://images.unsplash.com/photo-1606562297910-eb71cd6693ab?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[2]._id,
        isbn: '9780385121675',
        publishedDate: new Date('1977-01-28'),
        genres: [createdGenres[4]._id],
        description: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.',
        availableCopies: 20,
        language: 'English',
        pages: 447,
        reviews: [
          {
            userId: createdUsers[2]._id,
            rating: 4,
            title: 'Creative concept',
            content: 'The world-building and premise were amazing.',
            helpful: 19
          },
          {
            userId: createdUsers[0]._id,
            rating: 5,
            title: 'Thrilling till the end',
            content: 'Had me guessing the whole time. Loved it.',
            helpful: 22
          },
        ],
        reviewsCount: 2
      },
      {
        title: 'Murder on the Orient Express',
        author: createdAuthors[3]._id,
        coverImage: 'https://images.unsplash.com/photo-1629677712305-4967def312c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TXVyZGVyJTIwb24lMjB0aGUlMjBPcmllbnQlMjBFeHByZXNzfGVufDB8fDB8fHww',
        publisher: createdPublishers[0]._id,
        isbn: '9780007119318',
        publishedDate: new Date('1934-01-01'),
        genres: [createdGenres[2]._id], 
        description: 'Famous detective Hercule Poirot investigates a murder that occurred on the train he is traveling on.',
        availableCopies: 15,
        language: 'English',
        pages: 256,
        reviews: [{
          userId: createdUsers[2]._id,
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
        coverImage: 'https://images.unsplash.com/photo-1509231173988-35aaf90d45a8?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[3]._id,
        isbn: '9781501110368',
        publishedDate: new Date('2016-08-02'),
        genres: [createdGenres[3]._id],
        description: 'A heartbreaking story about love, overcoming trauma, and strength.',
        availableCopies: 45,
        language: 'English',
        pages: 384,
        reviews: [
          {
            userId: createdUsers[1]._id,
            rating: 4,
            title: 'Powerful themes',
            content: 'Deals with heavy topics gracefully and intelligently.',
            helpful: 15
          },
          {
            userId: createdUsers[2]._id,
            rating: 3,
            title: 'Bit underwhelming',
            content: 'Expected more from the ending. Still solid though.',
            helpful: 8
          },
          {
            userId: createdUsers[1]._id,
            rating: 5,
            title: 'Phenomenal!',
            content: 'Couldn’t stop thinking about it even after finishing.',
            helpful: 29
          },
          {
            userId: createdUsers[0]._id,
            rating: 2,
            title: 'Disappointed',
            content: 'The hype didn’t match the experience for me.',
            helpful: 5
          }
        ],
        reviewsCount: 4
      },
      {
        title: 'The Handmaid\'s Tale',
        author: createdAuthors[5]._id, 
        coverImage: 'https://images.unsplash.com/photo-1733255024953-fa05c5d0d76c?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[0]._id, 
        isbn: '9780385490818',
        publishedDate: new Date('1985-08-17'),
        genres: [createdGenres[1]._id, createdGenres[7]._id], 
        description: 'Dystopian novel set in a totalitarian theocracy where women are subjugated.',
        availableCopies: 40,
        language: 'English',
        pages: 311,
        reviews: [
          {
            userId: createdUsers[2]._id,
            rating: 4,
            title: 'Heartfelt and honest',
            content: 'A touching story that resonated deeply.',
            helpful: 16
          },
          {
            userId: createdUsers[1]._id,
            rating: 3,
            title: 'Unique perspective',
            content: 'Interesting premise but needed more depth.',
            helpful: 12
          },
          {
            userId: createdUsers[0]._id,
            rating: 5,
            title: 'Mind-blowing',
            content: 'One twist after another! Amazing storytelling.',
            helpful: 31
          },
          {
            userId: createdUsers[2]._id,
            rating: 4,
            title: 'Nailed the vibe',
            content: 'Exactly what I wanted out of this genre.',
            helpful: 17
          }
        ],
        reviewsCount: 4
      },
      {
        title: 'Coraline',
        author: createdAuthors[6]._id, 
        coverImage: 'https://images.unsplash.com/photo-1545200866-b13684ff687f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[1]._id,
        isbn: '9780061139376',
        publishedDate: new Date('2002-08-04'),
        genres: [createdGenres[9]._id],
        description: 'A young girl discovers a parallel world that hides sinister secrets.',
        availableCopies: 30,
        language: 'English',
        pages: 162,
        reviews: [
          {
            userId: createdUsers[1]._id,
            rating: 4,
            title: 'Smart and stylish',
            content: 'A fun, clever ride from start to finish.',
            helpful: 20
          },
          {
            userId: createdUsers[0]._id,
            rating: 5,
            title: 'Pure magic',
            content: 'Everything about this book was enchanting.',
            helpful: 34
          }
        ],
        reviewsCount: 2
      },
      {
        title: 'I Know Why the Caged Bird Sings',
        author: createdAuthors[7]._id,
        coverImage: 'https://images.unsplash.com/photo-1628428988999-714933015bf2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SSUyMEtub3clMjBXaHklMjB0aGUlMjBDYWdlZCUyMEJpcmQlMjBTaW5nc3xlbnwwfHwwfHx8MA%3D%3D',
        publisher: createdPublishers[2]._id,
        isbn: '9780345514400',
        publishedDate: new Date('1969-04-21'),
        genres: [createdGenres[6]._id], 
        description: 'Autobiography that illustrates how strength of character and a love of literature can help overcome racism and trauma.',
        availableCopies: 25,
        language: 'English',
        pages: 304,
        reviews: [
          {
            userId: createdUsers[1]._id,
            rating: 5,
            title: 'Powerful and emotional',
            content: 'Every page speaks volumes. A truly empowering story.',
            helpful: 22
          }
        ],
        reviewsCount: 1
      },
      {
        title: 'The Lightning Thief',
        author: createdAuthors[8]._id, // Rick Riordan
        coverImage: 'https://images.unsplash.com/photo-1621497591119-6062a8a5b8f0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[4]._id, // Scholastic
        isbn: '9780786838653',
        publishedDate: new Date('2005-06-28'),
        genres: [createdGenres[0]._id, createdGenres[10]._id], // Fantasy, Young Adult
        description: 'A boy discovers he’s a demigod and embarks on a quest to find Zeus’ stolen lightning bolt.',
        availableCopies: 60,
        language: 'English',
        pages: 377,
        reviews: [
          {
            userId: createdUsers[0]._id,
            rating: 5,
            title: 'Absolutely thrilling!',
            content: 'Loved the mythology and fast-paced plot. Great for young readers.',
            helpful: 19
          },
          {
            userId: createdUsers[2]._id,
            rating: 4,
            title: 'Fun adventure',
            content: 'It had great moments and funny scenes. Some parts were predictable.',
            helpful: 12
          }
        ],
        reviewsCount: 2
      },
      {
        title: 'The Testaments',
        author: createdAuthors[5]._id, // Margaret Atwood
        coverImage: 'https://images.unsplash.com/photo-1711613160718-73ab967c1757?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[5]._id, // Bloomsbury
        isbn: '9780385543781',
        publishedDate: new Date('2019-09-10'),
        genres: [createdGenres[1]._id], // Science Fiction
        description: 'A sequel to The Handmaid’s Tale, offering new perspectives on Gilead.',
        availableCopies: 38,
        language: 'English',
        pages: 419,
        reviews: [
          {
            userId: createdUsers[1]._id,
            rating: 4,
            title: 'Solid follow-up',
            content: 'Not quite as haunting as the first but still a strong narrative.',
            helpful: 14
          }
        ],
        reviewsCount: 1
      },
      {
        title: 'American Gods',
        author: createdAuthors[6]._id, // Neil Gaiman
        coverImage: 'https://plus.unsplash.com/premium_photo-1694475311493-87cd945765b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[1]._id, // HarperCollins
        isbn: '9780062572233',
        publishedDate: new Date('2001-06-19'),
        genres: [createdGenres[0]._id, createdGenres[1]._id], // Fantasy, Sci-Fi
        description: 'A modern fantasy where gods exist because people believe in them.',
        availableCopies: 50,
        language: 'English',
        pages: 465,
        reviews: [
          {
            userId: createdUsers[2]._id,
            rating: 5,
            title: 'Wild and imaginative',
            content: 'This book blew my mind. It’s deep, weird, and amazing.',
            helpful: 27
          },
          {
            userId: createdUsers[0]._id,
            rating: 4,
            title: 'Mythology meets mystery',
            content: 'It takes some patience, but it’s so worth it.',
            helpful: 18
          }
        ],
        reviewsCount: 2
      },
      {
        title: 'Phenomenal Woman',
        author: createdAuthors[7]._id, // Maya Angelou
        coverImage: 'https://plus.unsplash.com/premium_photo-1673716788773-4a8964fa26b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGhlbm9tZW5hbCUyMHBpbmt8ZW58MHx8MHx8fDA%3D',
        publisher: createdPublishers[2]._id, // Simon & Schuster
        isbn: '9780679439240',
        publishedDate: new Date('1995-03-01'),
        genres: [createdGenres[10]._id, createdGenres[11]._id], // Poetry, Biography
        description: 'A celebration of inner beauty, personal strength, and confidence through verse.',
        availableCopies: 28,
        language: 'English',
        pages: 128,
        reviews: [
          {
            userId: createdUsers[0]._id,
            rating: 5,
            title: 'Uplifting and bold',
            content: 'Every poem hit hard. Angelou’s voice is unmatched.',
            helpful: 25
          }
        ],
        reviewsCount: 1
      },
      {
        title: 'The Battle of the Labyrinth',
        author: createdAuthors[8]._id, // Rick Riordan
        coverImage: 'https://images.unsplash.com/photo-1593296123604-d981e7dcc21a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[4]._id, // Scholastic
        isbn: '9781423101468',
        publishedDate: new Date('2008-05-06'),
        genres: [createdGenres[0]._id, createdGenres[10]._id], // Fantasy, Young Adult
        description: 'Percy Jackson returns in the fourth book to face ancient monsters in the Labyrinth.',
        availableCopies: 70,
        language: 'English',
        pages: 361,
        reviews: [
          {
            userId: createdUsers[1]._id,
            rating: 4,
            title: 'Great addition to the series',
            content: 'A little darker than the others but still really good.',
            helpful: 15
          },
          {
            userId: createdUsers[2]._id,
            rating: 5,
            title: 'Percy Jackson delivers again!',
            content: 'Monsters, gods, and mazes—what’s not to love?',
            helpful: 30
          }
        ],
        reviewsCount: 2
      },
      {
        title: 'On Writing: A Memoir of the Craft',
        author: createdAuthors[2]._id, // Stephen King
        coverImage: 'https://images.unsplash.com/photo-1603696500532-36b050b0f1c1?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[1]._id, // HarperCollins
        isbn: '9780743455961',
        publishedDate: new Date('2000-10-03'),
        genres: [createdGenres[6]._id, createdGenres[7]._id], // Biography, Self-Help
        description: 'Part memoir, part master class by one of the bestselling authors of all time.',
        availableCopies: 33,
        language: 'English',
        pages: 288,
        reviews: [
          {
            userId: createdUsers[0]._id,
            rating: 5,
            title: 'For writers and readers alike',
            content: 'Half memoir, half writing manual. Both parts are fantastic.',
            helpful: 23
          }
        ],
        reviewsCount: 1
      },
      {
        title: 'The Casual Vacancy',
        author: createdAuthors[0]._id, // J.K. Rowling
        coverImage: 'https://images.unsplash.com/photo-1668906903861-5e5087c37ed5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[0]._id, // Penguin Random House
        isbn: '9780316228534',
        publishedDate: new Date('2012-09-27'),
        genres: [createdGenres[5]._id], // Historical Fiction
        description: 'A small-town election causes chaos in a seemingly idyllic English village.',
        availableCopies: 42,
        language: 'English',
        pages: 503,
        reviews: [
          {
            userId: createdUsers[2]._id,
            rating: 3,
            title: 'Dark and slow',
            content: 'Interesting characters, but it took a while to get into.',
            helpful: 10
          }
        ],
        reviewsCount: 1
      },
      {
        title: 'Verity',
        author: createdAuthors[4]._id, // Colleen Hoover
        coverImage: 'https://images.unsplash.com/photo-1735794463942-9a4b4405b6b6?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[3]._id, // Hachette
        isbn: '9781791392796',
        publishedDate: new Date('2018-12-07'),
        genres: [createdGenres[3]._id, createdGenres[4]._id], // Romance, Thriller
        description: 'A psychological thriller with twists that blend love, trauma, and deceit.',
        availableCopies: 36,
        language: 'English',
        pages: 314,
        reviews: [
          {
            userId: createdUsers[1]._id,
            rating: 5,
            title: 'Chilling and intense',
            content: 'One of the most shocking endings I’ve read.',
            helpful: 28
          },
          {
            userId: createdUsers[0]._id,
            rating: 4,
            title: 'Twisted and compelling',
            content: 'Couldn’t look away. So disturbing but so good.',
            helpful: 19
          }
        ],
        reviewsCount: 2
      },
      {
        title: 'And Then There Were None',
        author: createdAuthors[3]._id, // Agatha Christie
        coverImage: 'https://images.unsplash.com/photo-1654336945271-5f88ace80c85?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        publisher: createdPublishers[0]._id, // Penguin Random House
        isbn: '9780062073488',
        publishedDate: new Date('1939-11-06'),
        genres: [createdGenres[2]._id, createdGenres[4]._id], // Mystery, Thriller
        description: 'Ten strangers are invited to an island, and one by one, they begin to die.',
        availableCopies: 30,
        language: 'English',
        pages: 264,
        reviews: [
          {
            userId: createdUsers[2]._id,
            rating: 5,
            title: 'Masterful mystery',
            content: 'Classic whodunit. The ending caught me completely off guard.',
            helpful: 32
          }
        ],
        reviewsCount: 1
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