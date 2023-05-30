
const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const description = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");

fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then((value) => {
   
    for( let i =0; i < 5; i++) {
       let li = document.createElement("li")
       ulTodo.append(li)
       li.innerHTML= value.todos.todo;
    }
    console.log(value)
});

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