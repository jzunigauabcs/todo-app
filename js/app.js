const todoInput = document.querySelector(".todo-input");
const btnAdd = document.querySelector("#btnAdd");
const newTaskText = document.querySelector(".new-task-text");
const btnLoggin = document.querySelector("#btnLoggin");



btnLoggin.addEventListener("click", () => {
	const user = document.querySelector("#user").value;
	const password = document.querySelector("#password").value;

	document.cookie = `saludo=${user}; max-age=0;`;
})

btnAdd.addEventListener("click", () => {
	todoInput.classList.remove("hidden")
	todoInput.focus();
	newTaskText.classList.add("hidden")
})

todoInput.addEventListener("keypress", e => {
	if(e.key === "Enter") {
		const task = e.target.value;
		const taskElement =  makeTaskElement(task);
		const todoList = document.querySelector(".todo-list");
		const taskCheckComplete = taskElement.querySelector("input[type=checkbox]");
		const removeBtn = taskElement.querySelector("a");
		bindTaskEvent(taskCheckComplete, "click", completeTask)
		bindTaskEvent(removeBtn, "click", deleteTask)
		todoList.prepend(taskElement)
		e.target.value = "";
		e.target.classList.toggle("hidden")
		newTaskText.classList.toggle("hidden")


	}
})

const makeTaskElement = function(task) {
	/*const template = `<li>
		<input type="checkbox">
		<label for="">${task}</label>
		<a href="#"></a>
		</li>`;
	document.querySelector('.todo-list').innerHTML += template;
	//document.querySelector('.todo-list').textContent += template;*/
	const li = document.createElement('li');
	const checkbox = document.createElement('input')
	const label = document.createElement('label')
	const a = document.createElement('a');

	checkbox.type = "checkbox";
	label.textContent = task;
	a.href = "#";

	li.appendChild(checkbox);
	li.appendChild(label);
	li.appendChild(a);

	return li
}

const bindTaskEvent = function(el, event, fn) {
	el.addEventListener(event, fn)
}

const completeTask = function(e) {
	const parent = e.target.parentNode;
	parent.classList.toggle("task-complete")
	const taskCompleteNumber = document.querySelector(".task-complete-number span")
	taskCompleteNumber.textContent = countTaskCompletes();	
}

const deleteTask = function(e) {
	const parent = e.target.parentNode;
	const parentList = parent.parentNode;

	parentList.removeChild(parent)
	const taskCompleteNumber = document.querySelector(".task-complete-number span")
	taskCompleteNumber.textContent = countTaskCompletes();	
}

const countTaskCompletes = function() {
	return document.querySelectorAll("li.task-complete").length
}
