# Postway Backend

A RESTful API for a social media platform built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT and multi-device logout
- User profile management
- Post CRUD operations with image upload
- Comment system
- Like/unlike functionality for posts and comments
- Friendship system (send/accept/reject friend requests)
- OTP-based password reset
- Input validation and error handling
- Request logging

## Setup

1. Install dependencies: `npm install`
2. Create a `.env` file with the required environment variables
3. Start MongoDB
4. Run the server: `npm start`

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
