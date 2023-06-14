
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const descriptionInput = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
const form = document.getElementById("form");


let idCount = 31; // en räknare för att alla nya todos som skapas ska ha ett id över 30


//skapar ett todo objekt och pushar till listan

let todos = [];
let todo = {
   addtask: toDoInput.value, 
   bool: false,
} 
todos.push(todo)


getAllTodos()
//lägger till en ny todo i listan
addBtn.addEventListener("click", e => {
    

    createATodoFetch(todo, todos, () => {
      createTodo()

      })
    
})


//skapar en ny todo li
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
                createTodo(e)
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


//funktion som lägger till nya todo, vet inte riktigt hur denna fungerar heller 
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
    value.id = idCount++; 
    list.push(value);
    after();  //lägger till en funktion om det behövs lägg in after i parametern
  });
}
//tar bort alla todos vet ej riktigt hur denna fungerar?
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
  
  
  function getAllTodos() {
// fetch alla todos som visas vid start 
    fetch('https://dummyjson.com/todos?skip=2')  //?limit=12&skip=10

        .then(res => res.json())

        .then((info) => {
            loopTrueTodo(info.todos)
            
        })
}
// loopar igenom alla todos som vissas vid start
function loopTrueTodo(information) {

    for (let i = 0; i < 10; i++) {

        const e = information[i]
       
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