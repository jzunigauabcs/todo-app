const btnAdd = document.querySelector("#btnAdd");
const todoInput = document.querySelector(".todo-input");

btnAdd.addEventListener("click", () => {
	if(!todoInput.classList.contains("hidden"))
		return;
	document.querySelector(".new-task-text").classList.toggle("hidden");
	todoInput.classList.toggle("hidden");
	todoInput.focus();
} )

todoInput.addEventListener("keypress", e =>{
	if(e.key === "Enter") {
		const task = e.target.value
		const taskElement = makeTaskElement(task);
		const parent = document.querySelector(".todo-list");
		const taskCheckComplete = taskElement.querySelector("input[type=checkbox]");
		const trashAnchor = taskElement.querySelector("a")

		bindTaskEvent(taskCheckComplete, 'click', toggleTask);
		bindTaskEvent(trashAnchor, 'click', deleteTask);
		parent.prepend(taskElement);
		e.target.value = "";
		document.querySelector(".new-task-text").classList.toggle("hidden");
		todoInput.classList.toggle("hidden");
	}
});

const makeTaskElement = function(task) {
	const li = document.createElement("li");
	const checkbox = document.createElement("input");
	const label = document.createElement("label");
	const trashAnchor = document.createElement("a");

	checkbox.type = "checkbox";
	label.textContent = task;
	trashAnchor.href = "#";
	li.appendChild(checkbox);
	li.appendChild(label);
	li.appendChild(trashAnchor);

	return li;
}

const bindTaskEvent = function(el, event, fn) {
	el.addEventListener(event, fn);
}

const deleteTask = function(e) {
	const parentTask = e.target.parentNode;
	const parentList = parentTask.parentNode;
	parentList.removeChild(parentTask);
}

const toggleTask = function(e) {
	const parentTask = e.target.parentNode;
	const labelTask = parentTask.querySelector("label");
	labelTask.classList.toggle("task-complete");
}
