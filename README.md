# Game Characters CRUD API

## Description

- **Objective:** Create a CRUD API for managing game characters that allows adding, updating, deleting, and retrieving game characters.

## Requirements

- Implement a CRUD API following RESTful standards.
- Implement a simple pagination for retrieving lists of game characters
- Implement middleware to handle not found and internal server errors.

## Bonus

- Implement validation middleware to validate the request body for POST and PUT requests.

# SOLUTION DETAILS

## Components

### 1. Character Model (`character.js`)

Defines the MongoDB schema for game characters including `name`, `class`, `level`, `email`, and `createdAt`. Validates the email format using a custom validator.

### 2. Validators (`validators.js`)

Middleware to validate required fields (`name` and `class`) for creating new characters. Validates the `email` format.

### 3. Error Handlers (`errorHandlers.js`)

- #### `notFoundHandler`

  Middleware to handle 404 errors when a route or resource is not found.

- #### `errorHandler`

  Middleware to handle all other errors.

### 4. Routes (`characters.js`)

Implements CRUD operations for the game characters:

- `GET /api/characters`: list of characters with pagination.
- `GET /api/characters/name/:name`: get character by name.
- `GET /api/characters/email/:email`: get character by email.
- `POST /api/characters`: Creates a new character.
- `PUT /api/characters/:id`: Updates a character by ID.
- `PUT /api/characters/name/:name`: Updates a character by name.
- `PUT /api/characters/email/:email`: Updates a character by email.
- `DELETE /api/characters/:id`: Deletes a character by ID.

### 5. Main (`index.js`)

Sets up the Express server, configures middleware, defines routes using, handles MongoDB connection, and starts the server.

## How to Run

1. **Setup & Run**

After downloading MongoDB and node.
   - Clone the repository and navigate into the project directory.
   - Install dependencies using `npm install`.
   - Start MongoDB server (`mongod`).

2. **Testing**

   - We can use Postman to test API endpoints (`POST`, `GET`, `PUT`, `DELETE`).
