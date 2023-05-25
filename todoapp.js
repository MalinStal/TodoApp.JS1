const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const description = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");

let todos = [];
let todo = {
    addTask: toDoInput.value,
    description: description.value,
    bool: false,
}
todos.push(todo);
console.log(todos)

// skapa en ny li vid knapp tryckning
addBtn.addEventListener("click", function() {
  todos.forEach(todo =>{
    let li = document.createElement("li");
    ulTodo.append(li);
    li.innerHTML= todo.addTask;

    let paragraf = document.createElement("p");
    li.append(paragraf)
    paragraf.innerHTML = todo.description;
    
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "X";
    li.append(closeBtn);


    //toDoInput.value = "";
   // description.value = "";

    //stryker över texten när en uppgift är klar och flytta till done list
    li.addEventListener("click" , e => {
       // todo.done = false;
      
        li.style.textDecoration = "line-through";
        ulDone.appendChild(li);
        todo.bool = true
        e.preventDefault()
      
        
    });
    //dubbelklicka för att ta bort sträcket om man behöver göra uppgiften igen och flytta tillbaka den till todo list
    li.addEventListener("dblclick", e => {
       
            ulTodo.appendChild(li);
        li.style.textDecoration = "none";
        e.preventDefault()
        //todo.done = true;
        
    })
    //tar bort uppgiften när du klickar på x knappen
    closeBtn.addEventListener("click", e => {
        if(li.parentElement === ulTodo) {
            ulTodo.removeChild(li)
        } 
        else if(li.parentElement === ulDone)  {
            ulDone.removeChild(li)
        }
            e.stopPropagation()
       
    })
})
    

}); 




// denna boolean ska på något sätt ha koll på om uppgiften är klar eller inte. 
