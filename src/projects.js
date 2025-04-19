import TodoList from "./index.js";
//constructor for the project
class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todos = [];
    }
//pushes the todo to the todos array
    addTodo(todo) {
        this.todos.push(todo);
    }
//removes the todo from the todos array
    removeTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }
}