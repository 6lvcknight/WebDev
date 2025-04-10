/*
    Script to insert books into database
*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book, Author, Genre, Publisher } from './models/Book.js';

dotenv.config()

const insertBooks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Random authors to populate AuthorSchema (Generated using ChatGPT)
        const [tolkien, orwell] = await Author.insertMany([
            {
                name: 'J.R.R. Tolkien',
                biography: 'English writer, poet, and academic.',
                birthDate: new Date('1892-01-03'),
                nationality: 'British'
            },
            {
                name: 'George Orwell',
                biography: 'English novelist and critic.',
                birthDate: new Date('1903-06-25'),
                nationality: 'British'
            }
        ])
        
        // Random genres to populate GenreSchema (Generated using ChatGPT)
        const [fantasy, dystopian] = await Genre.insertMany([
            {
                name: 'Fantasy',
                description: 'Fantasy literature with mythical elements'
            },
            {
                name: 'Dystopian',
                description: 'Fiction set in a totalitarian or post-apocalyptic society'
            }
        ])
        
        // Random publishers to populate PublisherSchema (Generated using ChatGPT)
        const [harperCollins, seckerWarburg] = await Publisher.insertMany([
            {
                name: 'HarperCollins',
                address: 'New York, USA',
                website: 'https://www.harpercollins.com'
            },
            {
                name: 'Secker & Warburg',
                address: 'London, UK',
                website: 'https://www.seckerandwarburg.co.uk'
            }
        ])
        
        // Random books to populate BookSchema (Generated using ChatGPT)
        await Book.insertMany([
            {
                title: 'The Hobbit',
                author: tolkien._id,
                publisher: harperCollins._id,
                isbn: '978-0-261-10221-7',
                publishedDate: new Date('1937-09-21'),
                genres: [fantasy._id],
                description: 'A hobbit goes on a grand adventure.',
                availableCopies: 5,
                totalCopies: 5,
                rating: 4.8
            },
            {
                title: '1984',
                author: orwell._id,
                publisher: seckerWarburg._id,
                isbn: '978-0-452-28423-4',
                publishedDate: new Date('1949-06-08'),
                genres: [dystopian._id],
                description: 'A chilling vision of a totalitarian future.',
                availableCopies: 3,
                totalCopies: 5,
                rating: 4.7
            }
        ])

        console.log('Books inserted successfully.')
        process.exit(0)

    } catch(err) {
        console.error('Error:', err.message)
        process.exit(1)
    }
}

insertBooks()