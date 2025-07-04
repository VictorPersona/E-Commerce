
# E-Commerce Platform

This repository contains the source code for a full-stack e-commerce platform. The project is divided into three main parts:

1. **Frontend**: A React-based user interface for customers.
2. **Admin Panel**: A React-based admin interface for managing products, orders, and users.
3. **Backend**: A Node.js and Express-based API for handling business logic and database operations.

---

## Features

### Frontend
- **Home Page**: Displays featured products and categories.
- **Product Pages**: Detailed pages for individual products.
- **Cart**: Add, remove, and view items in the shopping cart.
- **Authentication**: Login and registration functionality.
- **Search**: Search bar for finding products.
- **Contact Page**: Contact information and form.
- **Responsive Design**: Optimized for mobile and desktop.

### Admin Panel
- **Product Management**: Add, edit, and delete products.
- **Order Management**: View and manage customer orders.
- **Authentication**: Admin login functionality.
- **Sidebar Navigation**: Easy access to admin features.

### Backend
- **User Authentication**: Secure login and registration using JWT.
- **Product Management**: APIs for CRUD operations on products.
- **Order Management**: APIs for handling customer orders.
- **Environment Variables**: Configured using `dotenv`.

---

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- React Toastify

### Admin Panel
- React
- React Router
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Bcrypt for password hashing

---

## Installation

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/e-commerce-platform.git
    cd e-commerce-platform
    ```

2. Install dependencies for each part:
    - **Frontend**:
      ```bash
      cd frontend
      npm install
      ```
    - **Admin Panel**:
      ```bash
      cd admin
      npm install
      ```
    - **Backend**:
      ```bash
      cd backend
      npm install
      ```

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory with the following:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```

4. Run the development servers:
    - **Frontend**:
      ```bash
      cd frontend
      npm run dev
      ```
    - **Admin Panel**:
      ```bash
      cd admin
      npm run dev
      ```
    - **Backend**:
      ```bash
      cd backend
      npm start
      ```

---

## Folder Structure

```
E-Commerce/
├── admin/          # Admin panel source code
├── backend/        # Backend API source code
├── frontend/       # Customer-facing frontend source code
└── README.md       # Project documentation
```




---

## License
This project is licensed under the MIT License.  
