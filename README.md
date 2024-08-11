Register User
Endpoint: /register

Method: POST

Description: This endpoint allows a new user to register by providing their name, email, and password. The password is hashed before being stored in the database.

Request Body:

json
Copy code
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
Response:

201 Created

json
Copy code
{
  "message": "User Created Successfully",
  "data": {
    "payload": {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "token": "jwt_token_here"
  }
}
400 Bad Request

json
Copy code
{
  "message": "User Already Exists"
}
500 Internal Server Error

json
Copy code
{
  "message": "An error occurred",
  "error": "error_message_here"
}
Login User
Endpoint: /login

Method: POST

Description: This endpoint allows an existing user to log in by providing their email and password. If the credentials are correct, a JWT token is generated and sent as an HTTP-only cookie.

Request Body:

json
Copy code
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
Response:

201 Created

json
Copy code
{
  "message": "User LoggedIn Successfully",
  "data": {
    "payload": {
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "token": "jwt_token_here"
  }
}
400 Bad Request

json
Copy code
{
  "message": "User Doesn't Exist"
}
500 Internal Server Error

json
Copy code
{
  "message": "Please Enter the Correct Password"
}
Technologies Used
Node.js: A JavaScript runtime built on Chrome's V8 engine.
Express.js: A web application framework for Node.js.
MongoDB: A NoSQL database for storing user data.
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
bcrypt: A library to help hash passwords.
jsonwebtoken (JWT): A library to sign and verify JSON Web Tokens.
Error Handling
The API handles errors using standard HTTP status codes:

400: Bad Request - the request could not be understood or was missing required parameters.
500: Internal Server Error - an error occurred on the server.
