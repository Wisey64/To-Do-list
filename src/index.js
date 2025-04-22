import './styles.css';

const todos = []; //array to store all todos

//constructor for the to-do list
class TodoList {
    constructor(title, description,date, priority, isCompleted) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isCompleted = isCompleted;

        todos.push(this); //push the new todo to the todos array

    }


    // to toggle the completion status of the todo
    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
    
    }

    // Function to get all todos
function getAllTodos() {
    return todos;
}

const todoList1 = new TodoList("Buy groceries", "Milk, Bread, Eggs", "2023-10-01", "High", false);
const todoList2 = new TodoList("Clean the house", "Living room, Kitchen", "2023-10-02", "Medium", false);

console.log(getAllTodos()); 
    export default TodoList;


