## Social Media Api Documentation

This api is a robust api that functions as an api for a social application and handles the fundamentals of a regular social media api.

# How to run this project:

Clone this git repo on your IDE
Do npm install to install all used packages for the project
Create a dotenv file for your Port, MongoUrl and Jwt Secret. (Please let me know if i have to share you my mongo url, it contains sensitive info thats why i'm not putting it here)
run "npm run start" to start the server
Start using the endpoints.✔

# Features:

Registration
JWT Authentication
File upload
Pagination
Rate Limiting

# Routes:

"/api/auth/register" => create user [POST]
"/api/auth/login" => login user (successful login generates token) [POST]
"/api/user/:id" => get user by id (authenticated) [GET]
"/api/user/:id/friends" => get user friends by id (authenticated) [GET]
"/api/user/:id/:friendId" => follow/unfollow user (authenticated) [PATCH]
"/api/post/:userId" => getFeedPosts(user posts and following users posts) (authenticated) [GET]
"/api/post/:userId/posts" => getUserPosts(get user posts) (authenticated) [GET]
"/api/post/:id" => get total comments and likes on a Post (authenticated) [GET]
"/api/post" => create post (authenticated) [POST]
"/api/post/:id/like" => like/unlike post (authenticated) [PATCH]
"/api/post/:id/comment" => comment on a post (authenticated) [POST]

# Notes:

Token expires after 24hrs
Rate limiting limits api calls to 100 requests per 15 minutes
Use form-data body format when using the register and create post endpoints because they accept image files which need to be in a multi data format which json cannot handle properly.

Please reach out to me for any clarifications or issues, thank you.
