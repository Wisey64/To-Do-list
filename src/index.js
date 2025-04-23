import './styles.css';
import { main } from './sidebar.js'; //importing the main content

const todos = []; //array to store all todos
const addbtn = document.querySelector('.add-todo-btn');
//modal for the add button
const modal = document.createElement('dialog');
modal.classList.add('modal');


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


//event listener for the add button to create a 
// modal for inputing the data for the todo
addbtn.addEventListener('click', function () {
    main.appendChild(modal);
    modal.showModal();
    modal.innerHTML = `
    
    <button class="modal-close-btn">&times;</button>
    <form method="dialog">
        <h2>Add Todo</h2>
        <label for="title">Title:</label>
        <input type="text" id="title" required>
        <label for="description">Description:</label>
        <textarea id="description" required></textarea>
        <label for="date">Date:</label>
        <input type="date" id="date" required>
        <label for="priority">Priority:</label>
        <select id="priority" required>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <button class="sbtn" type="submit">Add Todo</button>
    </form>


    `;

    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-close-btn')) {
            modal.close();
            modal.remove();
        }
    });
})
    




    export default TodoList;


