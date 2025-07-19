# Postway Backend

[![GitHub](https://img.shields.io/badge/GitHub-Postway--Backend-blue?logo=github)](https://github.com/Mahendra0006/restfulApi-postway-ii)

A RESTful API for a social media platform built with Node.js, Express, and MongoDB. This API provides comprehensive social networking features with robust security and scalability.

## Features

### GitHub Repository
- [View on GitHub](https://github.com/Mahendra0006/restfulApi-postway-ii)

### Core Features
- User authentication with JWT and multi-device logout
- User profile management with gender-specific fields
- Post CRUD operations with image upload support
- Comment system with nested replies
- Like/unlike functionality for posts and comments
- Friendship system (send/accept/reject friend requests)
- OTP-based password reset and verification
- Input validation and error handling
- Request logging with Morgan middleware
- MongoDB integration with robust schemas

### Security Features
- Password hashing using bcrypt
- JWT authentication with token management
- Multi-device session support
- Input validation middleware
- Environment variable configuration
- Error handling middleware
- Secure MongoDB connection

### Technical Stack
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Morgan for request logging
- dotenv for environment variables
- Custom middleware for validation and error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following environment variables:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

3. Start MongoDB (required)

4. Run the server:
```bash
npm start
```

## Project Structure

```
postway-backend-full/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── post.controller.js
│   ├── comment.controller.js
│   ├── like.controller.js
│   └── friend.controller.js
├── middleware/
│   ├── validate.middleware.js
│   └── error.middleware.js
├── models/
│   ├── User.model.js
│   ├── Post.model.js
│   ├── Comment.model.js
│   ├── Like.model.js
│   ├── FriendRequest.model.js
│   └── OTP.model.js
├── routes/
│   ├── auth.route.js
│   ├── users.route.js
│   ├── posts.route.js
│   ├── comments.route.js
│   ├── likes.route.js
│   └── friends.route.js
├── server.js
└── package.json
```

## API Endpoints

### Authentication

- POST /api/users/signup
- POST /api/users/signin
- POST /api/users/logout
- POST /api/users/logout-all-devices

### User Profile

- GET /api/users/get-details/:userId
- GET /api/users/get-all-details
- PUT /api/users/update-details/:userId

### Posts

- GET /api/posts/all
- GET /api/posts/:postId
- GET /api/posts/user/:userId
- POST /api/posts/
- PUT /api/posts/:postId
- DELETE /api/posts/:postId

### Comments

- GET /api/comments/:postId
- POST /api/comments/:postId
- PUT /api/comments/:commentId
- DELETE /api/comments/:commentId

### Likes

- GET /api/likes/:id
- POST /api/likes/toggle/:id

### Friends

- GET /api/friends/get-friends/:userId
- GET /api/friends/get-pending-requests
- POST /api/friends/toggle-friendship/:friendId
- POST /api/friends/response-to-request/:friendId

### OTP

- POST /api/otp/send
- POST /api/otp/verify
- POST /api/otp/reset-password

## Testing

- Use Postman to test endpoints
- Ensure MongoDB is running
- Test all CRUD operations and authentication flows
