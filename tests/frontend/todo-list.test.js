import { TodoList } from '../../frontend/src/js/todo-list.js';
import { Todo } from '../../frontend/src/js/todo-item.js';

describe('TodoList', () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  test('should add a todo', () => {
    const todo = new Todo('Test todo');
    todoList.addTodo(todo);
    expect(todoList.getTodos()).toHaveLength(1);
    expect(todoList.getTodos()[0]).toBe(todo);
  });

  test('should remove a todo', () => {
    const todo1 = new Todo('Todo 1');
    const todo2 = new Todo('Todo 2');
    todoList.addTodo(todo1);
    todoList.addTodo(todo2);
    todoList.removeTodo(0);
    expect(todoList.getTodos()).toHaveLength(1);
    expect(todoList.getTodos()[0]).toBe(todo2);
  });
});
