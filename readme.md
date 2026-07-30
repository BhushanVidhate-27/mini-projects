# Mini Projects Collection

A collection of mini projects built while learning **Node.js**, **Express.js**, **MongoDB**, **REST APIs**, and backend development.

Each project is self-contained and can be set up using the provided `setup.sh` script.

---

## Projects

| Project | Description |
|---------|-------------|
| **json-rest** | REST application using a JSON file as the data source. |
| **fs-rest** | REST application that performs CRUD operations using the Node.js File System (`fs`) module. |
| **mongoose-rest** | RESTful CRUD application using Express.js, MongoDB, and Mongoose. |
| **wanderLust** | A full-stack Airbnb-inspired web application featuring property listings, user authentication, image uploads, reviews, and CRUD functionality using Node.js, Express.js, MongoDB, Mongoose, Passport.js, and Cloudinary. |

---

## Prerequisites

Make sure the following are installed on your system:

- Node.js
- npm
- Git

For the **mongoose-rest** and **wanderLust** projects, ensure MongoDB is installed and running.

---

## Setup

Clone the repository:

```bash
git clone https://github.com/BhushanVidhate-27/mini-projects.git
```

Move into the repository:

```bash
cd mini-projects
```

Run the setup script:

```bash
bash setup.sh
```

The script will:

- Display the list of available projects.
- Let you choose which project to run.
- Install all required dependencies.
- Start the development server.
- Open the project in your default browser.

---

## Repository Structure

```text
mini-projects/
│
├── json-rest/
├── fs-rest/
├── mongoose-rest/
├── wanderLust/
├── setup.sh
└── README.md
```

---

## Tech Stack

- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose
- Passport.js
- Cloudinary
- HTML
- CSS
- JavaScript

---

## Notes

- Each project contains its own source code, dependencies, and README.
- The projects are independent of one another.
- If you are running **mongoose-rest** or **wanderLust**, make sure your MongoDB server is running before starting the project.
- The **wanderLust** project also requires its environment variables (such as Cloudinary and database configuration) to be set before running.

---

## Author

**Bhushan Vidhate**
