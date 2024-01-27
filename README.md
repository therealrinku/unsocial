# Robosocial

Robosocial is a minimal social media application for sharing images, following your friends and having some fun.

## Features

- **Upload Images:** Share your moments with your friends.
- **Follow and Engage with your friends:** Keep in touch with your friends by liking, commenting and engaging with their posts.
- **Explore:** Explore and find new friends.

## Technologies Used

- **React.js:** Frontend development
- **Node.js and Express.js:** Backend developement
- **Firebase:** Utilized for file storage and frontend deployment
- **Vercel:** Backend deployment

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed
- Firebase account for file storage setup
- Postgresql database

### Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/therealrinku/robosocial.git

2. Install the dependencies on both client and backend folders respectively.
   ```bash
   yarn install
   
3. Get your firebase app config and add to firebase.js file in client folder

4. Get your postgresql db setup and connection string(I got it from elephantSQL.com) and add it to db.js in backend folder.

5. Run the backend/database/createTables.js script in the backend/database directory for creating the required database tables(posts, users, notifications and comments)
   ```bash
      node createTables.js

6. Run the backend from backend folder
   ```bash
   node server.js

7. Run the frontend.
   ```bash
   yarn start
