# CTC Challenge 

## Overview
This project is a full-stack application built with React, Vite, Rails, and Action Cable. 
The frontend is powered by React (with Vite as the build tool), and the backend is powered by Ruby on Rails with Action Cable for WebSocket support.
The database is SQLite, and user credentials are managed using the Devise gem.

## Startup Command

To get the project up and running, simply use Docker Compose:

```bash
docker compose up
```
This will start both the frontend and backend services.

## Test User
For testing purposes, you can use the following test credentials to log into the application:

Email: test@test.com
Password: password

## Admin Panel
The admin panel for managing your application is accessible at the following URL:

**http://localhost:3000/motor_admin**

## Frontend
The frontend is built using React and Vite. Once the project is up and running, the React application should be accessible in the browser.

## Backend
The backend is built with Ruby on Rails and uses Action Cable for WebSocket communication.

- The backend API and server should be accessible at http://localhost:3000.
- The database is SQLite, which is used for local development.

## User Authentication
User credentials are handled using the Devise gem, which provides authentication, registration, and user management functionality.

## Running Backend Tests
You can run the backend tests with the following command:

```
rails test
```

This will execute the unit tests for the Rails application.

## Notes

Make sure you have Docker and Docker Compose installed on your system before running the startup command.





