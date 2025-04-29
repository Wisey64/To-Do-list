import { renderAllTodos, todos } from './index.js'; // Import the centralized rendering function and todos array

const all = document.querySelector(".all");
const today = document.querySelector(".today");
const completed = document.querySelector(".completed"); // Select the "Completed" button
const content = document.querySelector('.todo-list');

// Event listener for the "All" button
all.addEventListener("click", function () {
    renderAllTodos(); // Clear and re-render all to-dos
});

// Event listener for the "Today" button
today.addEventListener("click", function () {
    content.innerHTML = ''; // Clear the current content

    const todayDate = new Date().toISOString().split('T')[0];

    const todaysTodos = todos.filter(todo => todo.date === todayDate);

    todaysTodos.forEach(todo => todo.render());
});

// Event listener for the "Completed" button
completed.addEventListener("click", function () {
    content.innerHTML = ''; // Clear the current content

    const completedTodos = todos.filter(todo => todo.isCompleted);

    completedTodos.forEach(todo => todo.render());
});

export const main = document.querySelector(".main-content");