import { TodoItem } from "./todo-item";
import { TodoProject } from "./todo-project";
import { Storage } from "./storage";
import { updateProjectsSection, populateTodoItems } from "./dom-logic";


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
    const addItemForm = new AddForm('Add to-do item');
    addItemForm.addInput('Title: ', 'title');
    addItemForm.addInput('Description: ', 'description');
    addItemForm.addInput('Due date: ', 'due-date', 'date');
    addItemForm.addRadioButtons('Priority: ', 'priority', 
        ['High', 'Medium', 'Low'], 
        ['high', 'medium', 'low']);

    addItemForm.addButton('Add To-do Item');

    addItemForm.display();

    const addButton = document.querySelector('#form-add-button');
    addButton.addEventListener('click', () => {
        const title = addItemForm.container.querySelector('#title').value;
        if (!title) {
            alert('Title must be non-empty.');
            return;
        }
        const description = addItemForm.container.querySelector('#description').value;

        const dueDate = addItemForm.container.querySelector('#due-date').value;
        if (!dueDate) {
            alert('Must provide a due date.');
            return;
        }
        const priority = addItemForm.container.querySelector('input[name=priority]:checked').value;
        document.querySelector('#container').removeChild(addItemForm.container);

        const item = new TodoItem(title, description, dueDate, priority);
        storage.addItem(project, item);
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

        inputRow.appendChild(labelElement);
        inputRow.appendChild(input);

        this.container.appendChild(inputRow);
    }

    addRadioButtons(label, id, labels, values) {
        const inputRow = document.createElement('p');
        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
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

export {createAddProjectForm, createAddItemForm, AddForm};