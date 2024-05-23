//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list"); //ul
const filterOption = document.querySelector(".filter-todo"); //select element

//EVENTS LISTENERS
//check for content in locacalStorage
document.addEventListener("DOMContentLoaded", getTodos);
//check if input is not empty
document.addEventListener("keydown", blockSubmit);

//add todo creating div element with li and two buttons for completed and trash
todoButton.addEventListener("click", addTodo);
//use event target to identify location of clicks for completed or deleted buttons
todoList.addEventListener("click", deleteCheck);
//check value of select option and display the one selected
filterOption.addEventListener("change", filterTodos);

//FUNCTIONS

//by default submit button is desabled
todoButton.disabled = true;
//prevents from submitting empty string
function blockSubmit() {
  //trim the value to prevent no space / empty is submitted
  if (todoInput.value.trim().length > 0) {
    todoButton.disabled = false;
  } else {
    todoButton.disabled = true;
  }
}

function addTodo(e) {
  //prevent from from submitting
  e.preventDefault();

 // if (todoInput.value.trim().length > 0) {
  //Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //appen todoDiv to LIST
  todoList.appendChild(todoDiv);

  //Create item li - it will have inside two buttons
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //save to local storage.
  saveLocalTodos(todoInput.value);
  //reset input value to nothing
  todoInput.value = "";
  //re-desable Button
  todoButton.disabled = true;
  //add class
  newTodo.classList.add("todo-item");
  //append li to div
  todoDiv.appendChild(newTodo);


  //Checkmark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // } else {
  //   todoButton.disabled = true;

  // }
}

function deleteCheck(e) {
  //to see what we are clicking on
  const item = e.target;

  //DELETE TODO
  //need to specify that I need the first classList of item
  if (item.classList[0] === "trash-btn") {
    //this deltes the button only, not the whole element, the todoDiv.
    //item.remove();
    //remove the whole div element of when the tras-btn is clicked
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //passing div to be removed in localStorage.
    removeLocalTodos(todo);
    //wait for the transition to be completed before removing element from ul
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //COMPLETE TODO
  if (item.classList[0] === "complete-btn") {
    //add class of "completed" to todoDiv element of when the complete-btn is clicked
    //using toggle for unchecking item
    item.parentElement.classList.toggle("completed");
  }


  
}

function filterTodos(e) {
  //children of ul element
  const todos = todoList.childNodes;
  //going to loop through each todos ul to find the event click value of the select element
  todos.forEach(function (todo) {
    //check the (e.target)value of the options in the select element which is where the event run
    switch (e.target.value) {
      case "all":
        //display the listitems
        todo.style.display = "flex";
        break;

      case "completed":
        //display or add the list items
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//USING LOCAL STORAGE

function saveLocalTodos(todo) {
  //CHECK
  //Check if I already have things in there
  let todos;
  //if we dot have it we create an empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
    //if we do we get it
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //we push the new todo to the todos array
  todos.push(todo);
  //we set the local storage with the updated todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  //CHECK
  let todos;
  //if we dot have it we create an empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
    //if we do we get it
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //get the items and loop through them
  todos.forEach((todo) => {
    //Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //appen todoDiv to LIST
    todoList.appendChild(todoDiv);

    //Create item li - it will have inside two buttons
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    //add class
    newTodo.classList.add("todo-item");
    //append li to div
    todoDiv.appendChild(newTodo);

    //Checkmark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
  });
}

function removeLocalTodos(todo) {
  //CHECK
  let todos;
  //if we dot have it we create an empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
    //if we do we get it
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //idetify the index of only the text of li element of the div
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  //update the local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
