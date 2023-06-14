
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const descriptionInput = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
const form = document.getElementById("form");

let todos = [];
let idCount = 31; // en räknare för att alla nya todos som skapas ska ha ett id över 30

getAllTodos()

//lägger till en ny todo objekt i listan
addBtn.addEventListener("click", e => {
let todo = {
    addtask: toDoInput.value,
    bool: false,
    
} 
if ( todo.addtask !== "") {
    document.querySelector(".errorMessage").style.display = "none";
   todos.push(todo)
    createATodoFetch(todo.addtask, todos, () => {
        createTodo(todo)

    })
} else {
    document.querySelector(".errorMessage").style.display = "block";
}


    e.stopPropagation()
})

//skapar en ny todo li
function createTodo(todo) {

        const li = document.createElement("li");
        ulTodo.append(li);
       
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.append(checkbox)

        checkbox.checked = todo.bool
        checkbox.classList.add("checkbox")

        const title = document.createElement("h3");
        li.appendChild(title);
        title.innerHTML = todo.addtask;

        const timeStamp = document.createElement("span");
        li.append(timeStamp);
        timeStamp.classList.add("timestamps")
        timeStamp.innerHTML = "<strong>Added task: </strong>" + setTime();

        const timeStampDone = document.createElement("span");
        li.append(timeStampDone)
        timeStampDone.classList.add("timestamps")
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "Delete";
        li.append(closeBtn);
        closeBtn.classList.add("closeBtn");
        
        inBeginning(ulTodo, li)
       toDoInput.value = "";
    checkbox.addEventListener("change", e => {
        if (checkbox.checked) {
            todo.bool = true
            ulDone.append(li);
            timeStampDone.innerHTML = "<strong>Done whit task: </strong>" + setTime();
            inBeginning(ulDone, li)
        }
        else {
            todo.bool = false
            ulTodo.appendChild(li);
            timeStampDone.innerHTML = "";
            inBeginning(ulTodo, li)
        }
        e.stopPropagation()
    })

    closeBtn.addEventListener("click", e => {
        removeTodo(todo, todos, () => {

            if (li.parentElement === ulTodo) {
                ulTodo.removeChild(li)
            }
            else if (li.parentElement === ulDone) {
                ulDone.removeChild(li)
            }  
            e.stopPropagation()
        })
    }); 

};


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
            console.log(value.id)
        });
}
//tar bort alla todos vet ej riktigt hur denna fungerar?
function removeTodo(todo, list, after) {
    fetch("https://dummyjson.com/todos/" + todo.id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((value) => {
            if (value.isDeleted) {
                let index = list.findIndex((todo) => todo.id === value.id);
                if (index !== -1) {
                    list.splice(index, 1);
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
        const timeStamp = document.createElement("span");
        li.append(timeStamp);
        timeStamp.classList.add("timestamps")
        timeStamp.innerHTML = "<strong>Added task: </strong>" + setTime();

        const timeStampDone = document.createElement("span");
        li.append(timeStampDone)
        timeStampDone.classList.add("timestamps")
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
                timeStampDone.innerHTML = "<strong>Done whit task: </strong>" + setTime();

            } else {
                ulTodo.appendChild(li);
                console.log(bool)
                bool = false
                timeStampDone.innerHTML = "";
               
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

function setTime() {
    const now = new Date()
    let day = now.getDate().toString().padStart(2, "0");
    let month = now.getMonth() + 1;
    let month2 = month.toString().padStart(2, "0");
    let year = now.getFullYear();
    let currentDate = `${day}-${month2}-${year}`;

    const hoursAndMinutes = now.getHours() + ':' + now.getMinutes().toString().padStart(2, "0");

    return "Date: " + currentDate + " Time: " + hoursAndMinutes;
}

function inBeginning(parent, insert) {
 const firstChild = parent.firstChild;
 parent.insertBefore(insert, firstChild)
}