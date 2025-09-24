

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# User Management Dashboard

A full-stack **User Management Dashboard** built with **React (frontend)**, **Node.js + Express (backend)**, and **SQLite (database)**.  
The application allows you to **view, search, filter, sort, add, edit, and delete users** with a responsive and modern UI.

---

## 🚀 Features

### 🔹 User Management
- **View Users** – Fetches users from the backend and displays them in cards.
- **Search Users** – Search by selected field (First Name, Last Name, Email, or Department).
- **Filter** – Controlled by backend query params.
- **Sort** – Sort users by first name, last name, email, or department (ascending/descending).
- **Pagination** – Navigate between pages with **Previous/Next buttons** and change page size (10, 25, 50, 100).

### 🔹 CRUD Operations
- **Add User**  
  - Submit a new user via form  
  - Loader shown while submitting  
  - Popup status (success / error)

- **Edit User**  
  - Fetch user by ID (via `/users/:id`)  
  - Pre-fill form with details  
  - Update user with "Save Changes"  
  - Loader + status popup  

- **Delete User**  
  - Remove a user with confirmation  
  - Updates the list instantly  

### 🔹 Backend (Express + SQLite)
- **GET /users** – Fetch users with pagination, search, sort, and filters  
- **GET /users/:id** – Fetch user details by ID  
- **POST /users** – Add new user  
- **PUT /users/:id** – Update user details  
- **DELETE /users/:id** – Delete user  

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, React Router, Flexbox CSS (responsive design)
- **Backend:** Node.js, Express.js
- **Database:** SQLite (lightweight & file-based)

---








