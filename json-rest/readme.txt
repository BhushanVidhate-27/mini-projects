# JSON REST API

A simple REST application built with **Node.js**, **Express.js**, and **EJS** that performs CRUD operations on a local JSON file.

## Tech Stack

- Node.js
- Express.js
- EJS
- Method Override
- HTML/CSS

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Displays the home page. |
| GET | `/user` | Displays all users from the JSON file. |
| POST | `/user/:id/Edit` | Opens the edit form for the selected user. |
| PUT | `/user/:id` | Updates the user's details. |
| DELETE | `/user/:id` | Deletes the selected user. |

## Setup

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node index.js
```

or

```bash
npx nodemon index.js
```

Visit:

```text
http://localhost:8080
```

## Project Structure

```text
json-rest/
├── data/
│   └── data.json
├── public/
├── views/
├── index.js
├── package.json
└── README.md
```

## Features

- View all users
- Edit user information
- Delete users
- Uses JSON as the data source
- Server-side rendering with EJS

## Author

**Bhushan Vidhate**