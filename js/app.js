
const tasks = [];
const todoInput = document.querySelector(".todo-input");
const btnAdd = document.querySelector("#btnAdd");
const newTaskText = document.querySelector(".new-task-text");
let index = 1;

btnAdd.addEventListener("click", () => {
	todoInput.classList.remove("hidden")
	todoInput.focus();
	newTaskText.classList.add("hidden")
})

todoInput.addEventListener("keypress", e => {
	if(e.key === "Enter") {
		const task = e.target.value
		tasks.unshift(new Task(task,index++))
		e.target.value = "";
		e.target.classList.toggle("hidden")
		newTaskText.classList.toggle("hidden")
	}
})

class Task {
	constructor(task , i) {
		this.task = task;
		this.status = status = "incomplete";
		this.i = i;
	}

	completeTask () {
		this.status = "complete"
	}
}

