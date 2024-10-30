

# Book Collection API


The Book Collection API is a RESTful service built with [Nest](https://github.com/nestjs/nest) framework. It provides RBAC features, endpoints for managing a collection of books, allowing users to create, read, update, and delete book entries.

## Features

- Role Based Authentication Control (RBAC)
  - Admin
    - Create Book
    - Update Book
    - Delete Book
    - Find All
    - Find By Id
  - User
    - Find All
    - Find By Id
- CRUD operations for books
- Data validation
- Error handling
- RESTful API design

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# API Endpoints

## Authentication

- Roles = [admin, user]
- POST /auth/login: Login Users
- POST /auth/register: Register Users

## Book

- GET /books: Retrieve all books
- GET /books/{id}: Get a specific book by ID
- POST /books: Add a new book
- PUT /books/{id}: Update an existing book
- DELETE /books/{id}: Remove a book from the collection

# Book Object

A book object

- id: Unique identifier
- title: Book title
- author: Author's name
- publish-date: Date when the book was published

