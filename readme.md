# TaskMaster Pro

TaskMaster Pro is a modern, responsive todo application built with vanilla JavaScript and FastAPI backend. It offers a sleek user interface with dark and light mode options, and provides basic CRUD operations for managing tasks.

## Features

- Create, read, update, and delete todos
- Toggle todo completion status
- Edit todo text inline
- Dark and light mode themes
- Responsive design
- Pagination for todo list
- Error handling and user feedback

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: FastAPI (Python)
- Database: In-memory storage (for demonstration purposes)

## Project Structure

- `index.html`: Main HTML file
- `styles.css`: CSS styles for the application
- `app.js`: Frontend JavaScript logic
- `main.py`: Backend FastAPI server
- `favicon.svg`: Application icon

## Setup and Installation

1. Clone the repository
2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
3. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
4. Open `index.html` in a web browser or serve it using a local server

## API Endpoints

- `POST /todos`: Create a new todo
- `GET /todos`: Retrieve all todos
- `PUT /todos/{todo_id}`: Update a specific todo
- `DELETE /todos/{todo_id}`: Delete a specific todo

## Testing

The project includes Jest test files for the TodoList and Todo components. To run the tests:

1. Install dev dependencies:
   ```bash
   npm install
   ```
2. Run the test command:
   ```bash
   npm test
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
