WonderLust is a full-stack web application where users can create, browse, edit, and review travel listings.
It includes authentication, image uploads, and a clean UI for exploring destinations.

Features
User Authentication

Sign up, login, and logout with Passport.js

Password hashing handled by passport-local-mongoose

Flash messages for success/error

Listings

Create new travel listings

Edit or delete listings

Each listing includes:

Title

Description

Price

Location

Image (stored on Cloudinary)

Reviews

Users can leave reviews on listings

Reviews can be edited or deleted

Server-side validation with Joi

Image Upload

Handled with Multer + Cloudinary Storage

Session & Security

Secure cookies

Session stored in MongoDB Atlas using connect-mongo

Database

MongoDB Atlas cluster

Mongoose models for Users, Listings, and Reviews

🛠️ Tech Stack
Backend

Node.js

Express.js

Mongoose

Passport.js

Multer

Cloudinary

Frontend

EJS

Bootstrap / custom CSS

major_project/
│
├── models/
├── routes/
├── public/
├── views/
│   ├── listings/
│   ├── users/
│   └── reviews/
│
├── utils/
├── index.js
├── package.json

