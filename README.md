# Todo List App

A simple, elegant fullstack todo list application built with Node.js, Express, and vanilla JavaScript.

## Features

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear all completed todos
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Inline editing

## Tech Stack

**Backend:**
- Node.js
- Express.js
- CORS middleware
- Body-parser

**Frontend:**
- HTML5
- CSS3 (with modern gradients and animations)
- Vanilla JavaScript (ES6+)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vaibhavsorcar/todo-list-app.git
cd todo-list-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
todo-app/
├── server.js          # Express server
├── package.json       # Dependencies and scripts
├── README.md          # Project documentation
└── public/            # Frontend files
    ├── index.html     # Main HTML file
    ├── style.css      # Styles
    └── script.js      # Frontend JavaScript
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development!