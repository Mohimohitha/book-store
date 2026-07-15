BookStore Application

A comprehensive MERN stack (MongoDB, Express, React, Node.js) platform designed to provide a secure and efficient book shopping experience for users, with dedicated management interfaces for sellers and administrators.

🚀 Project Overview

The BookStore application streamlines the process of browsing books, managing inventory, and tracking orders. It implements a robust MVC pattern to ensure modularity, security, and scalability.

🏗️ Technical Architecture

The application is built on the following stack:

Frontend: React.js with Tailwind CSS for a responsive, modern UI.

Backend: Node.js and Express.js providing a secure REST API.

Database: MongoDB managed via Mongoose schemas.

Authentication: JWT-based secure user, seller, and admin authentication.

⚙️ Key Features

Role-Based Access: Specialized dashboards for Users, Sellers, and Admins.

Product Management: Sellers can add, edit, and delete books; Admins manage overall platform integrity.

Secure Purchasing: Cart management and order tracking services.

MVC Pattern: Clear separation of concerns between Models, Controllers, and Routes for maintainability.

📂 Project Structure

Plaintext

BOOKSTORE/

├── backend/            # Express API, Controllers, Models, Routes

├── frontend/           # React Components, Pages, State Management

├── .gitignore          # Git tracking configuration

└── README.md           # Project documentation

🛠️ Installation & Setup
Clone the repository.

Install dependencies:

Bash

cd frontend && npm install

cd ../backend && npm install

Environment Variables: Create a .env file in the backend folder and add:

MONGODB_URI=<your_connection_string>

JWT_SECRET=<your_secret_key>

Run the application:

Backend: npm run server (or node server.js)

Frontend: npm run dev

👥 Credits & Contributions

This project was developed with a focus on full-stack MERN architecture.

Lead Developer & Architecture: Bramhanapalli Mohitha
