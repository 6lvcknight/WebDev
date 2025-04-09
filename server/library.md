# Library Endpoints
- `/api/library`

## Book Endpoints
### GET Requests
- `GET /api/books` - Retrieve all books (with pagination)
- `GET /api/books/:id` - Retrieve a specific book by ID
- `GET /api/books/search` - Search books by title, author, genre, etc.
- `GET /api/books/featured` - Get featured or recommended books
- `GET /api/books/recent` - Get recently added books
### POST Requests
- `POST /api/books` - Create a new book
- `POST /api/books/:id/reviews` - Add a review to a specific book
###  PUT/PATCH Requests
- `PUT /api/books/:id` - Update a specific book
- `PATCH /api/books/:id/availability` - Update book availability
### DELETE Requests
- `DELETE /api/books/:id` - Delete a specific book
- `DELETE /api/books/:bookId/reviews/:reviewId` - Remove a review
## Author Endpoints
### GET Requests
- `GET /api/authors` - Retrieve all authors
- `GET /api/authors/:id` - Retrieve a specific author
- `GET /api/authors/:id/books` - Get all books by a specific author
### POST Requests
- `POST /api/authors` - Create a new author
### PUT/PATCH Requests
- `PUT /api/authors/:id` - Update an author
### DELETE Requests
- `DELETE /api/authors/:id` - Delete an author
## Genre Endpoints
### GET Requests
- `GET /api/genres` - Retrieve all genres
- `GET /api/genres/:id` - Retrieve a specific genre
- `GET /api/genres/:id/books` - Get all books in a specific genre
### POST Requests
- `POST /api/genres` - Create a new genre
### PUT/PATCH Requests
- `PUT /api/genres/:id` - Update a genre
### DELETE Requests
- `DELETE /api/genres/:id` - Delete a genre
## Publisher Endpoints
### GET Requests
- `GET /api/publishers` - Retrieve all publishers
- `GET /api/publishers/:id` - Retrieve a specific publisher
- `GET /api/publishers/:id/books` - Get all books from a specific publisher
### POST Requests
- `POST /api/publishers` - Create a new publisher
### PUT/PATCH Requests
- `PUT /api/publishers/:id` - Update a publisher
### DELETE Requests
- `DELETE /api/publishers/:id` - Delete a publisher