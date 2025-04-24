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

        // add the todo to the DOM
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <h3>${todo.title}</h3>
                <p>${todo.description}</p>
                <p>${todo.date}</p>
                <p>${todo.priority}</p>
                <button class="toggle-completion">${todo.isCompleted ? 'Undo' : 'Complete'}</button>
            `;
            main.appendChild(todoItem);

            // event listener to toggle completion status
            const toggleButton = todoItem.querySelector('.toggle-completion');
            toggleButton.addEventListener('click', () => {
                todo.toggleCompletion();
                toggleButton.textContent = todo.isCompleted ? 'Undo' : 'Complete';
            });
        });

        

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

//const todoList1 = new TodoList("Buy groceries", "Milk, Bread, Eggs", "2023-10-01", "High", false);
//const todoList2 = new TodoList("Clean the house", "Living room, Kitchen", "2023-10-02", "Medium", false);

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
        <input type="text" id="title" class="ttl" required>
        <label for="description" >Description:</label>
        <textarea id="description" class="desc" required></textarea>
        <label for="date">Date:</label>
        <input type="date" id="date" class="dat" required>
        <label for="priority">Priority:</label>
        <select id="priority" class="prio" required>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <button class="sbtn" type="submit">Add Todo</button>
    </form>


    `;


    //event listener to close the modal when the close button is clicked
    modal.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-close-btn')) {
            modal.close();
            modal.remove();
        }
    });

    //eventlistener to submit the form and add the todo
    modal.addEventListener('click', function (s) {
        if (s.target.classList.contains('sbtn')) {
            s.preventDefault(); // prevent form submission
    
            // get input values
            const titlevalue = document.getElementById('title').value;
            const descriptionvalue = document.getElementById('description').value;
            const datevalue = document.getElementById('date').value;
            const priorityvalue = document.getElementById('priority').value;
    
            // validate inputs
            if (!titlevalue || !descriptionvalue || !datevalue || !priorityvalue) {
                alert("Please fill in all fields."); // show an error message
                return; // stop further execution
            }
    
            // create the todo if validation passes
            const isCompleted = false;
            const todo = new TodoList(titlevalue, descriptionvalue, datevalue, priorityvalue, isCompleted);
            console.log(todo);
            console.log(titlevalue)
            
            // close the modal
            modal.close();
            
            const form = modal.querySelector('form');
            if (form) form.reset()
            
        }
    });



})
    




    export default TodoList;


