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


}); 

