const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const description = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
const form = document.getElementById("form");


let todos = [];





// skapa en ny li vid knapp tryckning
addBtn.addEventListener("click", function() {
  let todo = {
    addTask: toDoInput.value,
    description: description.value,
    bool: false,
  }
todos.push(todo)
//todos.forEach(todo =>{
    const li = document.createElement("li");
    ulTodo.append(li);
    
    const checkbox = document.createElement("input");
    checkbox.type= "checkbox";
    li.append(checkbox)
    checkbox.classList.add("checkbox")
    const title = document.createElement("h3");
    li.appendChild(title);
    title.innerHTML= todo.addTask;

    const paragraf = document.createElement("p");
    li.append(paragraf)
    paragraf.innerHTML = todo.description;

    const timeStamp = document.createElement("span");
    li.append(timeStamp);
    timeStamp.classList.add("timestamps")
    timeStamp.innerHTML="added task  " + setTime();

    const timeStampDone = document.createElement("span");
        li.append(timeStampDone) 
        timeStampDone.classList.add("timestamps")
    
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Delete";
    li.append(closeBtn);
    closeBtn.classList.add("closeBtn");

    console.log(todos)

   toDoInput.value = "";
    description.value = "";

    //stryker över texten när en uppgift är klar och flytta till done list
   
    checkbox.addEventListener("change" , e => {
       if(checkbox.checked){
        title.style.textDecoration = "line-through";
        ulDone.appendChild(li);
        timeStampDone.innerHTML="  done whit task " + setTime();
        } else{
             ulTodo.appendChild(li);
        title.style.textDecoration = "none";
        timeStampDone.innerHTML=" ";
       
        }

        timeStampDone.style = ""
        e.preventDefault()
        
    });
    
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
//})
   

}); 
// funktion som sätter en tids stämpel
function setTime() {
    const now = new Date()
    const hoursAndMinutes = now.getHours() + ':' + now.getMinutes();

        return hoursAndMinutes;
    }

    


