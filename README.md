# Notes App (Deno 2 & React)

This is a full-stack notes application inspired by [freeCodeCamp's Full Stack Project Tutorial](https://www.freecodecamp.org/news/full-stack-project-tutorial-create-a-notes-app-using-react-and-node-js/), rebuilt using **Deno 2** for the backend instead of Node.js.

## Features
- **Create, read, update, and delete (CRUD)** notes
- **Frontend**: React with a responsive UI
- **Backend**: Deno 2 with a secure, scalable API
- **Database**: AWS Postgre
- RESTful API

## Tech Stack
- **Frontend**: React, HTML, CSS
- **Backend**: Deno 2
- **Database**: MongoDB or PostgreSQL (or any preferred DB compatible with Deno)

## Getting Started

### Prerequisites
- **Deno 2**: [Install Deno](https://deno.land/manual/getting_started/installation)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/max-nena-SD/note-full-stack-app.git
   cd note-full-stack-app
   ```

2. **Install frontend dependencies**:
   ```bash
   cd notes-app-ui
   deno task dev
   ```

3. **Start the Deno server**:
   ```bash
   cd ../notes-app-server
   deno run --allow-net --allow-read main.ts
   ```

4. **Run the React app**:
   ```bash
   cd ../notes-app-ui
   deno task dev
   ```

### Environment Variables
Create a `.env` file in the `/notes-app-server` directory with the following variables:
```plaintext
DATABASE_URL=<your_database_url>
PORT=<your_port>
```

## Project Structure

```plaintext
deno-notes-app/
├── notes-app-ui/          # React frontend
    ├── controllers/ # Logic for handling requests
└── notes-app-server/          # Deno backend
    ├── routes/      # API routes for CRUD operations
    ├── models/      # Database schema/model setup
    └── main.ts    # Entry point for the Deno server
```

## Usage
1. Start the server and client as instructed above.
2. Open `http://localhost:5000` in your browser.
3. Add, edit, and delete notes with a user-friendly interface.

## Future Enhancements
- User authentication with JWT
- Real-time updates using WebSockets
- Deployment guide for cloud services

## License
This project is licensed under the MIT License.
