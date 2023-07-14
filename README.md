# Authentication API

This is a Node.js authentication API built with Express, TypeScript, JWT (JSON Web Tokens), TypeORM, and Oracle SQL.

## Features

- User registration
- User login and JWT generation
- Token refresh endpoint
- Swagger documentation

## Prerequisites

- Node.js (v14 or above)
- Oracle database with the necessary configuration

## Getting Started

1. Clone the repository:

```bash
  git clone https://github.com/BBence9807/authentication-backend.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Create a .env file in the root of your project.
- Add the following variables to the .env file:
```bash
PORT=3000
DB_USERNAME=<your_database_username>
DB_PASSWORD=<your_database_password>
DB_HOST=<your_database_host>
DB_PORT=<your_database_port>
DB_NAME=<your_database_name>
JWT_SECRET=<your_jwt_secret>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
```

4. Set up the Oracle database:
- Ensure you have an Oracle database instance running with the provided credentials in the .env file.


5. Run the application:
```bash
npm start
```

6. Access the Swagger documentation:
- Open your web browser and navigate to http://localhost:{PORT}/api-docs, where {PORT} is the port number specified in your .env file (default: 3000).


## API Routes
- **`POST /auth/register`**: Register a new user.
- **`POST /auth/login`**: Login and get an access token.
- **`POST /auth/refresh-token`**: Refresh the access token using the refresh token.

For detailed documentation of the API routes, please refer to the Swagger documentation while the server is running.


## Technologies Used
- Node.js
- Express
- TypeScript
- JWT (JSON Web Tokens)
- TypeORM
- Oracle SQL
- Swagger


## License
This project is licensed under the MIT License.