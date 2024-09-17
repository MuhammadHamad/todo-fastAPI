export class Todo {
  constructor(text) {
    this.text = text;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateText(newText) {
    this.text = newText;
  }
}
