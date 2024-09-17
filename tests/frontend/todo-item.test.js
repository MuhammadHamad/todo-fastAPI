import { Todo } from '../../frontend/src/js/todo-item.js';

describe('Todo', () => {
  test('should create a new todo item', () => {
    const todo = new Todo('Test todo');
    expect(todo.text).toBe('Test todo');
    expect(todo.completed).toBe(false);
  });

  test('should toggle completion status', () => {
    const todo = new Todo('Test todo');
    todo.toggleComplete();
    expect(todo.completed).toBe(true);
    todo.toggleComplete();
    expect(todo.completed).toBe(false);
  });

  test('should update todo text', () => {
    const todo = new Todo('Original text');
    todo.updateText('Updated text');
    expect(todo.text).toBe('Updated text');
  });
});
