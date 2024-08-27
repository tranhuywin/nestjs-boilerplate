# NestJS Boilerplate with TypeORM, Swagger, and RESTful API

This project is a boilerplate for NestJS applications, featuring TypeORM for database management, Swagger for API documentation, and a RESTful API structure.

## Prerequisites

- Node.js (check in .nvmrc file)
- Yarn package manager
- Docker

## Installation

1. Install dependencies:
   ```
   yarn install
   ```

2. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your specific configuration.

3. Set up PostgreSQL database:
   ```
   make up-db
   ```

## Running the application

1. Start the development server:
   ```
   yarn start:dev
   ```

## Building for production

1. Build the application:
   ```
   yarn build
   ```

2. Start the production server:
   ```
   yarn start:prod
   ```

## Features

- NestJS framework
- TypeORM for database management
- Swagger for API documentation
- RESTful API structure
- Docker support for easy deployment
- Environment configuration
- JWT authentication
- File upload with S3 integration

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
