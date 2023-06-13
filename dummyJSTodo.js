
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const description = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
let todos = [];
//let newTodoId = 31;

fetch('https://dummyjson.com/todos?limit=10')
.then(response => {
  if (response.status !== 200) {//200 Code that displays that code works T_T
    alert("error")
  }
  return response.json()
})
.then((value) => {
      loopTrue(value.todos)
    
    console.log(value)
});

function loopTrue(todos) { 
 for (i =0; i < 10; i++){
  let e = todos[i]
  
 }
 
  /* for( let todo of todos) {
    let thisTodo = createATodo(todo);

    if (todo.completed === true) {
      ulDone.append(thisTodo);
      console.log(todo.completed)
    } else {
      ulTodo.append(thisTodo);
      console.log(todo.completed)
    }}*/
  }
    
function createATodo(todo) {
  const li = document.createElement("li");
    ulTodo.append(li);
    
    const checkbox = document.createElement("input");
    checkbox.type= "checkbox";
    
    checkbox.classList.add("checkbox")
    checkbox.checked = todo.completed;
    const title = document.createElement("h5");
    
    title.innerHTML= todo.todo;
    
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Delete";
    closeBtn.classList.add("closeBtn");

    li.append(checkbox, title, closeBtn );
    

    checkbox.addEventListener("change", e => {
      
      if(checkbox.checked){
        title.style.textDecoration = "line-through";
        ulDone.appendChild(li);
        
        //timeStampDone.innerHTML="  done whit task " + setTime();
        } else{
             ulTodo.appendChild(li);
        title.style.textDecoration = "none";
        //timeStampDone.innerHTML=" ";
       
        }
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
  
  addBtn.addEventListener("click", (e) => {
    addTodo (toDoInput.value, todos, () => {loopTrue(todos)})
  })
};
/*
    function addTodo (description, task, after) {
      fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: description,
          completed: false,
          userId: 1,
        })
      })
      .then(res => res.json())
      .then((value) => {
          value.id = newTodoId ++;
          task.push(value)
          after()
      });
      }
      
      
      function deleteTodo(todo, todos, after) {
      fetch('https://dummyjson.com/todos/' + todo.Id, {
        method: 'DELETE',
      })
      .then(res => res.json())
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
       */