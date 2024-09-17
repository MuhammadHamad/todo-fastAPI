from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4, UUID

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Todo(BaseModel):
    id: Optional[UUID] = None
    title: str
    completed: bool = False

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None

todos: List[Todo] = []

@app.post("/todos", response_model=Todo)
async def create_todo(todo: Todo):
    todo.id = uuid4()
    todos.append(todo)
    return todo

@app.get("/todos", response_model=List[Todo])
async def get_todos():
    return todos

@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: UUID, todo_update: TodoUpdate):
    for todo in todos:
        if todo.id == todo_id:
            if todo_update.title is not None:
                todo.title = todo_update.title
            if todo_update.completed is not None:
                todo.completed = todo_update.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: UUID):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(index)
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")
