# Mongoose CRUD Revision Mini Project

This project demonstrates how to perform basic CRUD (Create, Read, Update, Delete) operations using **Express**, **EJS**, **MongoDB**, and **Mongoose**.

## Project Setup

1. Initialize the project.
2. Install the required packages:
   ```bash
   npm install express ejs mongoose
   ```
3. Create a basic Express application.
4. Connect Mongoose to the MongoDB database.
5. Start the Express server.

---

# Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Retrieve and display all posts. |
| GET | `/:id` | Retrieve and display a specific post. |
| POST | `/` | Create a new post (e.g., with a title/content). |
| PATCH | `/:id` | Update/Edit an existing post. |
| DELETE | `/:id` | Delete a specific post. |

---

# Mongoose Workflow

1. Connect to MongoDB using Mongoose.
2. Create a Schema.
3. Create a Model from the Schema.
4. Perform CRUD operations using the Model.
5. Render data using EJS templates.

---

# CRUD Methods

### Create
```js
Model.create()
```

### Read All
```js
Model.find()
```

### Read One
```js
Model.findById(id)
```

### Update
```js
Model.findByIdAndUpdate(id, update, { new: true })
```

### Delete
```js
Model.findByIdAndDelete(id)
```

---

# Project Flow

```
Client
   │
   ▼
Express Routes
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB Database
```