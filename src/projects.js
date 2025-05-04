import TodoList from "./index.js";
import './styles.css';
//constructor for the project
class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.projects = [];
    }
//pushes the todo to the todos array
    addTodo(todo) {
        this.projects.push(todo);
    }

}