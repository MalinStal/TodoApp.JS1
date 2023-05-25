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
    time: setTime(),
}
todos.push(todo);



// skapa en ny li vid knapp tryckning
addBtn.addEventListener("click", function() {
  todos.forEach(todo =>{
    const li = document.createElement("li");
    ulTodo.append(li);
    //li.innerHTML = todo.addTask;
    
    const title = document.createElement("h3");
    li.appendChild(title);
    title.innerHTML= todo.addTask;

    const paragraf = document.createElement("p");
    li.append(paragraf)
    paragraf.innerHTML = todo.description;

    const timeStamp = document.createElement("span");
    li.append(timeStamp);
    timeStamp.innerHTML="added task" + todo.time;
    
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "X";
    li.append(closeBtn);


   // toDoInput.value = "";
    //description.value = "";

    //stryker över texten när en uppgift är klar och flytta till done list
    li.addEventListener("click" , e => {
    
        title.style.textDecoration = "line-through";
        ulDone.appendChild(li);
        todo.bool = true
        
        const timeStampDone = document.createElement("span");
        li.append(timeStampDone) // skapar en tidsstämpel, behöver lösa så den försvinner om man vill ta tillbaka tasken till todolist
        timeStampDone.innerHTML="done whit task" + todo.time;
        e.preventDefault()
      
        
    }, {once : true}); //onse true betyder att detta event bara körs 1 gång sedan så går det inte att köra det igen. blir inte bra i detta läge 
    
    //dubbelklicka för att ta bort sträcket om man behöver göra uppgiften igen och flytta tillbaka den till todo list
    li.addEventListener("dblclick", e => {
       
        ulTodo.appendChild(li);
        title.style.textDecoration = "none";
       
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
// funktion som sätter en tids stämpel
function setTime() {
    let currentTime = new Date().getTime();
    let time = new Date(currentTime).toLocaleTimeString()
        return time;
    }


// denna boolean ska på något sätt ha koll på om uppgiften är klar eller inte. 
