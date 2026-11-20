# Event Registration API

Assignment 3 - Back End Development

## Technologies

- Node.js
- Express
- TypeScript
- Joi
- Firebase Firestore
- Jest
- Supertest

## Description

A RESTful Event Registration API that supports
creating, retrieving, updating, and deleting events.

The application uses Joi for input validation
and Firebase Firestore for persistent storage.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/health | Health check |
| POST | /api/v1/events | Create an event |
| GET | /api/v1/events | Retrieve all events |
| GET | /api/v1/events/:id | Retrieve one event |
| PUT | /api/v1/events/:id | Update an event |
| DELETE | /api/v1/events/:id | Delete an event |

## Installation

Install dependencies:

```sh
npm install