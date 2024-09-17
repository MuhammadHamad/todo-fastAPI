const API_URL = 'http://127.0.0.1:8000';
const ITEMS_PER_PAGE = 10;

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const themeSwitch = document.getElementById('checkbox');
const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
document.querySelector('.container').appendChild(paginationContainer);

let currentPage = 1;
let totalPages = 1;

// Error handling function
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.container').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

async function fetchTodos(page = 1) {
    try {
        const response = await fetch(`${API_URL}/todos?page=${page}&limit=${ITEMS_PER_PAGE}`);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        const todos = await response.json();
        if (!Array.isArray(todos)) {
            throw new Error('Invalid response format');
        }
        renderTodos(todos);
        // For now, we'll assume the total number of todos is the length of the array
        updatePagination(todos.length, page);
    } catch (error) {
        console.error('Error fetching todos:', error);
        showError('Failed to load todos. Please try again later.');
    }
}

function renderTodos(todos) {
    todoList.innerHTML = '';
    if (!Array.isArray(todos)) {
        console.error('Invalid todos data:', todos);
        return;
    }
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.title}</span>
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => updateTodo(todo.id, { completed: !todo.completed }));
        
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTodo(li, todo));
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        todoList.appendChild(li);
    });
}

function updatePagination(totalItems, currentPage) {
    totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    paginationContainer.innerHTML = '';
    
    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = i === currentPage ? 'active' : '';
            pageBtn.addEventListener('click', () => fetchTodos(i));
            paginationContainer.appendChild(pageBtn);
        }
    }
}

async function addTodo(title) {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false })
        });
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
        await fetchTodos(currentPage);
    } catch (error) {
        console.error('Error adding todo:', error);
        showError('Failed to add todo. Please try again.');
    }
}

async function updateTodo(id, updates) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        await fetchTodos(currentPage);
    } catch (error) {
        console.error('Error updating todo:', error);
        showError('Failed to update todo. Please try again.');
    }
}

function editTodo(li, todo) {
    const todoText = li.querySelector('.todo-text');
    const editBtn = li.querySelector('.edit-btn');
    
    if (editBtn.classList.contains('save-btn')) {
        return;
    }
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.title;
    input.className = 'todo-text';
    
    todoText.replaceWith(input);
    editBtn.innerHTML = '<i class="fas fa-save"></i>';
    editBtn.classList.add('save-btn');
    
    input.focus();
    
    const saveEdit = async () => {
        const newTitle = input.value.trim();
        if (newTitle && newTitle !== todo.title) {
            await updateTodo(todo.id, { title: newTitle });
        } else {
            const newTodoText = document.createElement('span');
            newTodoText.className = 'todo-text';
            newTodoText.textContent = todo.title;
            input.replaceWith(newTodoText);
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.classList.remove('save-btn');
        }
    };
    
    editBtn.onclick = saveEdit;
    
    input.onkeyup = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            const newTodoText = document.createElement('span');
            newTodoText.className = 'todo-text';
            newTodoText.textContent = todo.title;
            input.replaceWith(newTodoText);
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.classList.remove('save-btn');
        }
    };
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
        await fetchTodos(currentPage);
    } catch (error) {
        console.error('Error deleting todo:', error);
        showError('Failed to delete todo. Please try again.');
    }
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (title) {
        addTodo(title);
        todoInput.value = '';
    }
});

themeSwitch.addEventListener('change', () => {
    document.documentElement.classList.toggle('light-mode');
});

// Set initial state of the theme switch
themeSwitch.checked = !document.documentElement.classList.contains('light-mode');

fetchTodos();

// Instead, if you need these functions globally, you can attach them to the window object:
window.showError = showError;
window.renderTodos = renderTodos;
window.updatePagination = updatePagination;
