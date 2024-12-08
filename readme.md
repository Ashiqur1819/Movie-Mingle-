# MovieMingle API Server
This project is a Movies API Server built using Node.js, Express, and MongoDB. It provides RESTful endpoints for managing movies, users, favorites, and contact messages. This server is intended to serve as the backend for a movie management application.  

## Features
### Movies
- GET /movies: Retrieve all movies.
- GET /movies/:id: Retrieve details of a specific movie by ID.
- POST /movies: Add a new movie.
- PUT /movies/:id: Update a specific movie by ID.
- DELETE /movies/:id: Delete a specific movie by ID.

### Favorites
- GET /favourites: Retrieve all favorite movies.
- GET /favourites/:id: Retrieve details of a specific favorite movie by ID.
- POST /favourites: Add a movie to favorites.
- DELETE /favourites/:id: Remove a movie from favorites by ID.

### Users
- GET /users: Retrieve all users.
- GET /users/:id: Retrieve details of a specific user by ID.
- POST /users: Add a new user.
- PATCH /users: Update a user's lastSignInTime.

### Contact Users
- GET /contact_users: Retrieve all contact information.
- POST /contact_users: Add a new contact information.

## Dependencies
- express: For building RESTful APIs.
- cors: To handle Cross-Origin Resource Sharing.
- mongodb: To interact with MongoDB.
- dotenv: For environment variable management.