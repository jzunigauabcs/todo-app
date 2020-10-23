const todoInput = document.querySelector(".todo-input");
const btnAdd = document.querySelector("#btnAdd");
const newTaskText = document.querySelector(".new-task-text");
const btnLoggin = document.querySelector("#btnLoggin");
const btnLogout = document.querySelector("#logout");
let tasks = [];

loadTask()

/*const loggin = function (user){
	localStorage.setItem("user", user )
	hiddenLoggin()
}

const logout = function(){
	localStorage.removeItem("user")
	document.querySelector(".container-todo").classList.add("hidden")
	document.querySelector(".loggin").classList.remove("hidden")
}

const isLoggin = function() {
	return localStorage.getItem("user")
}

btnLogout.addEventListener('click',logout)

if(isLoggin()) {
	document.querySelector(".container-todo").classList.remove("hidden")
	document.querySelector(".loggin").classList.add("hidden")
}

const hiddenLoggin = function() {
	document.querySelector(".container-todo").classList.remove("hidden")
	document.querySelector(".loggin").classList.add("hidden")
}
*/

btnLoggin.addEventListener("click", () => {
	const user = document.querySelector("#user").value;
	const password = document.querySelector("#password").value;
	loggin(user)
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
		const id = new Date().getTime();
		storageTask(id, task)
		e.target.value = "";
		e.target.classList.toggle("hidden")
		newTaskText.classList.toggle("hidden")


	}
})

function loadTask() {
	tasks = JSON.parse(localStorage.getItem("tasks")) || [] 
	for(let task of tasks) {
		const taskElement =  makeTaskElement(task.task);
		const todoList = document.querySelector(".todo-list");
		const taskCheckComplete = taskElement.querySelector("input[type=checkbox]");
		const removeBtn = taskElement.querySelector("a");
		bindTaskEvent(taskCheckComplete, "click", completeTask)
		bindTaskEvent(removeBtn, "click", deleteTask)
		todoList.prepend(taskElement)
	}
}

function makeTaskElement(task) {
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

function bindTaskEvent(el, event, fn) {
	el.addEventListener(event, fn)
}

 function completeTask(e) {
	const parent = e.target.parentNode;
	parent.classList.toggle("task-complete")
	const taskCompleteNumber = document.querySelector(".task-complete-number span")
	taskCompleteNumber.textContent = countTaskCompletes();	
}

function deleteTask(e) {
	const parent = e.target.parentNode;
	const parentList = parent.parentNode;

	parentList.removeChild(parent)
	const taskCompleteNumber = document.querySelector(".task-complete-number span")
	taskCompleteNumber.textContent = countTaskCompletes();	
}

const countTaskCompletes = function() {
	return document.querySelectorAll("li.task-complete").length
}

const storageTask = function (id, task) {
	tasks.push({
		id: id,
		task: task
	})
	saveLocalStorage(tasks)
}



const saveLocalStorage = function(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks))
}
