
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const description = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");

fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then((value) => {
   
    for( let i =0; i < 5; i++) {
       let todos =  value.todos
       dummyJSTodo(todos)
    }
    console.log(value)
});

function dummyJSTodo(todo) {
  const li = document.createElement("li");
    ulTodo.append(li);
    
    const checkbox = document.createElement("input");
    checkbox.type= "checkbox";
    li.append(checkbox)
    checkbox.classList.add("checkbox")
    checkbox.checked = todo.completed;
    const title = document.createElement("h3");
    li.appendChild(title);
    title.innerHTML= todo.todo;

    const paragraf = document.createElement("p");
    li.append(paragraf)
    paragraf.innerHTML = todo.description;

   // const timeStamp = document.createElement("span");
    //li.append(timeStamp);
    //timeStamp.classList.add("timestamps")
    //timeStamp.innerHTML="added task  " + setTime();

    //const timeStampDone = document.createElement("span");
       // li.append(timeStampDone) 
       // timeStampDone.classList.add("timestamps")
    
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Delete";
    li.append(closeBtn);
    closeBtn.classList.add("closeBtn");

   

   //toDoInput.value = "";
   // description.value = "";

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
}

//bara klistrat in fetch för att läga till en todo
fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: 'Use DummyJSON in the project',
    completed: false,
    userId: 5,
  })
})
.then(res => res.json())
.then(console.log);
//klistrat in fetch för hur du tar bort todo
fetch('https://dummyjson.com/todos/1', {
  method: 'DELETE',
})
.then(res => res.json())
.then(console.log);