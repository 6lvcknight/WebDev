import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
    isbn: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    description: { type: String, required: true },
    availableCopies: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    coverImage: { type: String },
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reviewText: { type: String },
        rating: { type: Number, min: 1, max: 5 }
    }],
}, {timestamps: true})

const GenreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, {timestamps: true})

const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    biography: { type: String },
    birthDate: { type: Date },
    nationality: { type: String },
}, {timestamps: true})

const PublisherSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String },
    website: { type: String },
}, {timestamps: true})

const Book = mongoose.model('Book', BookSchema)
const Genre = mongoose.model('Genre', GenreSchema)
const Author = mongoose.model('Author', AuthorSchema)
const Publisher = mongoose.model('Publisher', PublisherSchema)
export { Book, Genre, Author, Publisher }