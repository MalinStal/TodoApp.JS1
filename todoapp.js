const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const description = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");

// skapa en ny li vid knapp tryckning
addBtn.addEventListener("click", function() {
  
    var li = document.createElement("li");
    li.innerHTML= toDoInput.value;
    ulTodo.appendChild(li);

    var paragraf = document.createElement("p");
    li.appendChild(paragraf)
    paragraf.innerHTML = description.value;
    
    var closeBtn = document.createElement("button");
    closeBtn.innerHTML = "X";
    li.appendChild(closeBtn);

    toDoInput.value = "";
    description.value = "";

    
    //stryker över texten när en uppgift är klar och flytta till done list
    li.addEventListener("click" , e => {
       // todo.done = false;
      
        li.style.textDecoration = "line-through";
        ulDone.appendChild(li);
        console.log("1")
        e.stopPropagation()
      
        
    });
    //dubbelklicka för att ta bort sträcket om man behöver göra uppgiften igen och flytta tillbaka den till todo list
    li.addEventListener("dblclick", e => {
        
        console.log("2")
            ulTodo.appendChild(li);
        li.style.textDecoration = "none";
        e.stopPropagation()
        //todo.done = true;
        
    })
    //tar bort uppgiften när du klickar på x knappen
    closeBtn.addEventListener("click", e => {
        if(ulTodo.li) {ulTodo.removeChild(li)} //if satsen fungerar ej 
        else {ulDone.removeChild(li)}
        console.log("3")
        e.stopPropagation()
      
    })
    
   /* let todo = {
    titel: "",
    description: "",
    done: false,
} */
}); 




// denna boolean ska på något sätt ha koll på om uppgiften är klar eller inte. 
