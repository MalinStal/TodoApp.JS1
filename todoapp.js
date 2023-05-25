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
      
        li.style.textDecoration = "line-through";
        ulDone.appendChild(li);
        console.log("1")
    });
    //debbelklicka för att ta bort sträcket om man behöver göra uppgiften igen och flytta tillbaka den till todo list
    li.addEventListener("dblclick", e => {
        console.log("2")
            ulTodo.appendChild(li);
        li.style.textDecoration = "none";
        
    })
    //tar bort uppgiften när du klickar på x knappen
    closeBtn.addEventListener("click", e => {
        ulTodo.removeChild(li)
        console.log("3")
      
    })
}); 

