const addBtn = document.getElementById("btn");
const toDoInput = document.getElementById("toDoInput");
const descriptionInput = document.getElementById("description");
const ulTodo = document.getElementById("myUlTodo");
const ulDone = document.getElementById("myUlDone");
const form = document.getElementById("form");

let todos = [];

// skapa en ny li vid knapp tryckning
addBtn.addEventListener("click", function () {
    let todo = {
        addTask: toDoInput.value,
        description: descriptionInput.value,
        bool: false,
    }
    todos.push(todo)

    if (toDoInput.value === "" || descriptionInput.value === "") {
        document.querySelector(".errorMessage").style.display = "block";
    } else {
        document.querySelector(".errorMessage").style.display = "none";

        const li = document.createElement("li");
        ulTodo.append(li);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        li.append(checkbox)
        checkbox.classList.add("checkbox")

        const title = document.createElement("h3");
        li.appendChild(title);
        title.innerHTML = todo.addTask;

        const paragraf = document.createElement("p");
        li.append(paragraf)
        paragraf.innerHTML = todo.description;

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

        toDoInput.value = "";
        description.value = "";
        // flyttar uppgiften mellan todo och done listan om checkboxen är checked eller inte
        checkbox.addEventListener("change", e => {
            if (checkbox.checked) {
                title.style.textDecoration = "line-through";
                paragraf.style.textDecoration = "line-through";
                todo.bool = true;

                ulDone.appendChild(li);
                timeStampDone.innerHTML = "<strong>Done whit task: </strong>" + setTime();
            } else {
                ulTodo.appendChild(li);
                title.style.textDecoration = "none";
                paragraf.style.textDecoration = "none";
                timeStampDone.innerHTML = "";
                todo.bool = false;
            }
            e.preventDefault()
        });

        //tar bort uppgiften när du klickar på delete knappen
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
});
// funktion som sätter en tids stämpel
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




