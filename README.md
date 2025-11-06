# COS498 Midterm Forum

## Project Overview

The Wild West Forum is a simple web application that allows users to register, log in, and post comments. It is the midterm assignment for the COS498 - Server-Side Web Development Course. The application was built using Express.js and Handlebars (HBS), with session-based authentication for user management. It is designed to run in Docker containers for easy setup and deployment.

### Features

- User registration and login with session handling
- Error handling for invalid credentials or duplicate accounts
- Post and display comments in real time
- Responsive and minimal interface using HTML and CSS
- Dynamic page rendering with Handlebars templates
- Docker-ready configuration for deployment

### Technologies Used

- Node.js
- Express.js
- Express-Session
- Handlebars (HBS)
- HTML / CSS
- JavaScript
- Docker

### Running the Project

- **Step 1 — Install Dependencies**

From inside the nodejs directory, install the dependencies:
- cd nodejs
- npm install

- **Step 2 — Build and Start the Containers**

Return to the root directory and use Docker Compose to build and start both containers:
- docker compose up --build

- **Step 3 - View the Results**

Once the containers are running, open your browser and navigate to the IP address of the VM/Host running the application.

- **Final Step - Stopping the Containers**

To stop all running containers:
- ^Z
- docker compose down
