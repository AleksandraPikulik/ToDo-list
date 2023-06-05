let todoInput; // miejsce, gdzie wpisujemy treść zadania
let errorInfo; // info o braku zadań/konieczności wpisania tekstu
let addBtn; // button add dodający zadania do listy
let ulList; // lista zadań
let newTask; // nowe Li - nowe zadanie
let toolsDiv; // box dla buttonów ptaszek, edit i krzyżyk
let completeBtn;
let editBtn;
let deleteBtn;
let popup;
let popupInfo; // tekst error, jeśli chce się edytować pustego inputa
let todoToEdit; // edytowany todo/nowe zadanie
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	// główne wywołanie funkcji
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	// pobranie elementów
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');
	popup = document.querySelector('.popup');
	popupInfo = document.querySelector('.popup-info');
	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	// nasłuchiwanie
	addBtn.addEventListener('click', addTask);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', addEditPopup);
	todoInput.addEventListener('keyup', enterCheck);
};

const addTask = () => {
	if (todoInput.value === '') {
		errorInfo.textContent = 'Musisz wpisać treść';
	} else {
		newTask = document.createElement('li');
		newTask.textContent = todoInput.value;
		ulList.append(newTask);

		createToolsArea();

		todoInput.value = '';
		errorInfo.textContent = '';
	}
};

const createToolsArea = () => {
	toolsDiv = document.createElement('div');
	newTask.append(toolsDiv);
	toolsDiv.classList.add('tools');

	completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsDiv.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.classList.toggle('completed');
		e.target.closest('li').classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editPopup(e);
	} else if (e.target.matches('.delete')) {
		deleteTask(e);
	}
};

const editPopup = (e) => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;

	popup.style.display = 'flex';
};

const closePopup = () => {
	popup.style.display = 'none';
	popupInfo.textContent = '';
};

const addEditPopup = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Musisz dodać treść';
	}
};

const deleteTask = (e) => {
	e.target.closest('li').remove();

	const allTask = ulList.querySelectorAll('li');

	if (allTask.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście';
	} else {
		errorInfo.textContent = '';
	}
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		addTask();
	}
};

document.addEventListener('DOMContentLoaded', main);
// event mówi, że jeśli cała strona zostanie załadowana, wtedy odpal funkcję main
