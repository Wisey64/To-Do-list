//constructor for the to-do list
class TodoList {
    constructor(title, description,date, priority, isCompleted) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.isCompleted = isCompleted;

    }
    // to toggle the completion status of the todo
    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
    
    }
    
    export default TodoList;


