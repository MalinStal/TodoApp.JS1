// prova att göra dummy js endast lägga till och ta bort todos här i 
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const descriptionInput = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
const form = document.getElementById("form");
let todos = [];

let todo = {
    task : toDoInput.value,
    completed: false,
}

function getAllTodos(){

    fetch('https://dummyjson.com/todos?skip=2')  //?limit=12&skip=10

    .then(res => res.json())

    .then((info) => {loopTrueTodo(info.todos)
    console.log(info.todos)
} )
}

getAllTodos()


function loopTrueTodo(info) {

        for(let i = 0; i < 10; i++) {

            const e = info[i]
           
            const li = document.createElement("li");
            ulTodo.append(li);
   
       const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            li.append(checkbox)
            let bool = e.completed
            checkbox.checked = bool
            checkbox.classList.add("checkbox")
   
       const title = document.createElement("h3");
            li.appendChild(title);
       title.innerHTML = e.todo
   
       
      
       const closeBtn = document.createElement("button");
       closeBtn.innerHTML = "Delete";
       li.append(closeBtn);
       closeBtn.classList.add("closeBtn");
       
          if(checkbox.checked) {
            ulDone.append(li)
        }
      checkbox.addEventListener("change", e => {
        if (checkbox.checked) {
            console.log(checkbox.value, bool)
            ulDone.append(li);
            bool = true

        } else {
            ulTodo.appendChild(li);
            console.log(checkbox.value, bool)
            bool = false
            


        }

      })
        } 

}
