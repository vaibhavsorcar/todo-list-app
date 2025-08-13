class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTodos();
    }

    bindEvents() {
        const todoInput = document.getElementById('todoInput');
        const addBtn = document.getElementById('addBtn');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const clearCompleted = document.getElementById('clearCompleted');

        addBtn.addEventListener('click', () => this.addTodo());
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        clearCompleted.addEventListener('click', () => this.clearCompleted());
    }

    async loadTodos() {
        try {
            const response = await fetch('/api/todos');
            this.todos = await response.json();
            this.renderTodos();
            this.updateStats();
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    }

    async addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) return;

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                const newTodo = await response.json();
                this.todos.push(newTodo);
                input.value = '';
                this.renderTodos();
                this.updateStats();
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !todo.completed }),
            });

            if (response.ok) {
                todo.completed = !todo.completed;
                this.renderTodos();
                this.updateStats();
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    }

    async updateTodoText(id, newText) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newText }),
            });

            if (response.ok) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) todo.text = newText;
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    async deleteTodo(id) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.todos = this.todos.filter(t => t.id !== id);
                this.renderTodos();
                this.updateStats();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    async clearCompleted() {
        const completedTodos = this.todos.filter(t => t.completed);
        
        for (const todo of completedTodos) {
            await this.deleteTodo(todo.id);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTodos();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        todoList.innerHTML = '';

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <input type="text" class="todo-text" value="${todo.text}">
                <button class="delete-btn">Delete</button>
            `;

            // Bind events
            const checkbox = li.querySelector('.todo-checkbox');
            const textInput = li.querySelector('.todo-text');
            const deleteBtn = li.querySelector('.delete-btn');

            checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
            textInput.addEventListener('blur', () => this.updateTodoText(todo.id, textInput.value.trim()));
            textInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') textInput.blur();
            });
            deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

            todoList.appendChild(li);
        });
    }

    updateStats() {
        const activeTodos = this.todos.filter(t => !t.completed);
        const count = activeTodos.length;
        const todoCount = document.getElementById('todoCount');
        
        todoCount.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});