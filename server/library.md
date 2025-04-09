# Library Endpoints
- `/api/library`

## Book Endpoints
### GET Requests
- `GET /` - Retrieve all books
- `GET /books/:id` - Retrieve a specific book by ID
- `GET /books/search` - Search books by title, author, genre, etc.
- `GET /books/recent` - Get recently added books
### POST Requests
- `POST /` - Create a new book
- `POST /books/:id/reviews` - Add a review to a specific book
###  PUT/PATCH Requests
- `PUT /books/:id` - Update a specific book
- `PATCH books/:id/availability` - Update book availability
### DELETE Requests
- `DELETE /books/:id` - Delete a specific book
- `DELETE /books/:bookId/reviews/:reviewId` - Remove a review
## Author Endpoints
### GET Requests
- `GET /authors` - Retrieve all authors
- `GET /authors/:id` - Retrieve a specific author
- `GET /authors/:id/books` - Get all books by a specific author
### POST Requests
- `POST /authors` - Create a new author
### PUT/PATCH Requests
- `PUT /authors/:id` - Update an author
### DELETE Requests
- `DELETE /authors/:id` - Delete an author
## Genre Endpoints
### GET Requests
- `GET /genres` - Retrieve all genres
- `GET /genres/:id` - Retrieve a specific genre
- `GET /genres/:id/books` - Get all books in a specific genre
### POST Requests
- `POST /genres` - Create a new genre
### PUT/PATCH Requests
- `PUT /genres/:id` - Update a genre
### DELETE Requests
- `DELETE /genres/:id` - Delete a genre
## Publisher Endpoints
### GET Requests
- `GET /publishers` - Retrieve all publishers
- `GET /publishers/:id` - Retrieve a specific publisher
- `GET /publishers/:id/books` - Get all books from a specific publisher
### POST Requests
- `POST /publishers` - Create a new publisher
### PUT/PATCH Requests
- `PUT /publishers/:id` - Update a publisher
### DELETE Requests
- `DELETE /publishers/:id` - Delete a publisher