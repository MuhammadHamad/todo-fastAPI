export class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    // Add the new todo to the beginning of the array
    this.todos.unshift(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  getTodos() {
    return this.todos;
  }
}
