import { TodoItem } from "./todo-item";
import { TodoProject } from "./todo-project";
import { Storage } from "./storage";
import { updateProjectsSection, populateTodoItems } from "./dom-logic";
import { verifyDate } from "./date-verify";


function createAddProjectForm(storage) {
    const addProjectForm = new AddForm('Add project', storage);
    addProjectForm.addInput('Name: ', 'name');
    addProjectForm.addButton('Add Project');

    const addButton = addProjectForm.container.querySelector('#form-add-button');
    addButton.addEventListener('click', () => {
        const name = document.querySelector('#name').value;
        document.querySelector('#container').removeChild(document.querySelector('#add-form'));
        const project = new TodoProject(name);
        storage.addProject(project);
        updateProjectsSection(storage);
    });
    addProjectForm.display();
}

function createAddItemForm(storage, project) {
    const addItemForm = createItemForm('Add to-do item');

    const addButton = document.querySelector('#form-add-button');
    addButton.addEventListener('click', () => {
        const inputValues = getInputValues(addItemForm);

        const item = new TodoItem(inputValues.title, inputValues.description, inputValues.dueDate, inputValues.priority);
        storage.addItem(project, item);
        populateTodoItems(storage, project);
    });
}

function createItemForm(label) {
    const form = new AddForm(label);
    form.addInput('Title: ', 'title');
    form.addInput('Description: ', 'description');
    form.addInput('Due date: ', 'due-date', 'date');
    form.addRadioButtons('Priority: ', 'priority', 
        ['High', 'Medium', 'Low'], 
        ['high', 'medium', 'low']);

    form.addButton(label);

    form.display();
    return form;
}

function getInputValues(form) {
    const title = form.container.querySelector('#title').value;
        if (!title) {
            alert('Title must be non-empty.');
            return;
        }
        const description = form.container.querySelector('#description').value;

        const dueDate = form.container.querySelector('#due-date').value;
        if (!dueDate) {
            alert('Must provide a due date.');
            return;
        }
        if (!verifyDate(dueDate)) {
            alert('Due date selected is not in the future.');
            return;
        }

        const priority = form.container.querySelector('input[name=priority]:checked').value;
        document.querySelector('#container').removeChild(form.container);

        return { title, description, dueDate, priority };
}

function createEditItemForm(storage, project, item) {
    const editItemForm = createItemForm('Edit to-do item');
    editItemForm.container.querySelector('#title').value = item.title;
    editItemForm.container.querySelector('#description').value = item.description;
    editItemForm.container.querySelector('#due-date').value = item.dueDate;
    editItemForm.container.querySelector(`input[value="${item.priority}"]`).checked = true;  

    const editButton = document.querySelector('#form-add-button');
    editButton.addEventListener('click', () => {
        const inputValues = getInputValues(editItemForm);
        item.editDetails(inputValues.title, inputValues.description, inputValues.dueDate, inputValues.priority);
        storage.updateStorage();
        populateTodoItems(storage, project);
    });
}

class AddForm {
    constructor(title) {
        this.container = document.createElement('div');
        this.container.id = 'add-form';

        const titleRow = document.createElement('div');
        titleRow.id = 'add-form-title-row';

        const titleText = document.createElement('div');
        titleText.innerText = title;
        titleText.id = 'add-form-title';

        const closeButton = document.createElement('button');
        closeButton.id = 'close-add-form';
        closeButton.innerText = 'X';

        closeButton.addEventListener('click', () => {
            document.querySelector('#container').removeChild(this.container);
        });

        titleRow.appendChild(titleText);
        titleRow.appendChild(closeButton);

        this.container.appendChild(titleRow);
    }

    addInput(label, id, type = '') {
        const inputRow = document.createElement('p');
        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.innerText = label;
        const input = document.createElement('input');
        input.id = id;
        if (type)
            input.type = type;
        else
            input.type = 'text';

        inputRow.appendChild(labelElement);
        inputRow.appendChild(input);

        this.container.appendChild(inputRow);
    }

    addRadioButtons(label, id, labels, values) {
        const inputRow = document.createElement('p');
        const labelElement = document.createElement('label');
        labelElement.innerText = label;

        inputRow.appendChild(labelElement);

        for (let i = 0; i < labels.length; i++) {
            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = id + values[i];
            radioLabel.innerText = labels[i];

            const input = document.createElement('input');
            input.name = id;
            input.id = id + values[i];
            input.type = 'radio';
            input.value = values[i];
            if (i === 0)
                input.checked = true;

            inputRow.appendChild(input);
            inputRow.appendChild(radioLabel);
        }
        this.container.appendChild(inputRow);
    }

    addButton(label) {
        const addButton = document.createElement('button');
        addButton.innerText = label;
        addButton.id = 'form-add-button';

        this.container.append(addButton);
    }

    display() {
        const contentContainer = document.querySelector('#container');
        contentContainer.appendChild(this.container);
    }
}

export {createAddProjectForm, createAddItemForm, createEditItemForm, AddForm};