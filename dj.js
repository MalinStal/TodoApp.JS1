// prova att göra dummy js endast lägga till och ta bort todos här i 
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const descriptionInput = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
const form = document.getElementById("form");
let todos = [];
let idCounter = 31;

addBtn.addEventListener("click", e => {
    let todo = toDoInput.value

    createATodoFetch(toDoInput.value, todos, () => {
      createTodo()

      })
    
})
function getAllTodos() {

    fetch('https://dummyjson.com/todos?skip=2')  //?limit=12&skip=10

        .then(res => res.json())

        .then((info) => {
            loopTrueTodo(info.todos)
            console.log(info.todos)
        })
}

getAllTodos()

function createTodo() {
    const li = document.createElement("li");
    ulTodo.append(li);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.append(checkbox)
    let bool = false
    checkbox.checked = bool
    checkbox.classList.add("checkbox")

    const title = document.createElement("h3");
    li.appendChild(title);
    title.innerHTML = toDoInput.value

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Delete";
    li.append(closeBtn);
    closeBtn.classList.add("closeBtn");
    
    checkbox.addEventListener("change", e => {
        if (checkbox.checked) {
            console.log(bool)
            ulDone.append(li);
            bool = true

        } else {
            ulTodo.appendChild(li);
            console.log(bool)
            bool = false

        }
        e.stopPropagation()
    })

        closeBtn.addEventListener("click", e => {
           
            removeTodo(todo, todos, () => {
                createTodo();
              });
            /* if (li.parentElement === ulTodo) {
                ulTodo.removeChild(li)
            }
            else if (li.parentElement === ulDone) {
                ulDone.removeChild(li)
            }*/
            e.stopPropagation()
    
        })
       
}
function loopTrueTodo(info) {

    for (let i = 0; i < 10; i++) {

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

        //checkbox för att lägga alla checkade todos från fetchen i rätt lista
        if (checkbox.checked) {
            ulDone.append(li)
        }

        checkbox.addEventListener("change", e => {
            if (checkbox.checked) {
                console.log(bool)
                ulDone.append(li);
                bool = true

            } else {
                ulTodo.appendChild(li);
                console.log(bool)
                bool = false

            }
            e.stopPropagation()
        })

        closeBtn.addEventListener("click", e => {
           
           
             if (li.parentElement === ulTodo) {
                ulTodo.removeChild(li)
            }
            else if (li.parentElement === ulDone) {
                ulDone.removeChild(li)
            }
            e.stopPropagation()
    
        })

    }

}
function createATodoFetch(todo, list, after) {
    fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: todo,
    completed: false,
    userId: 1,
  })
})

.then(res => res.json())
.then((value) => {
    value.id = idCounter++; // Fake this value because otherwise all created todos will have id 151.
    list.push(value);
    after();  //lägger till en funktion om det behövs lägg in after i parametern
  });
}
function removeTodo(todo, todos, after) {
    fetch("https://dummyjson.com/todos/" + todo.id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((value) => {
        if (value.isDeleted) {
          let index = todos.findIndex((todo) => todo.id === value.id);
          if (index !== -1) {
            todos.splice(index, 1);
          }
          after();
        }
      });
  }