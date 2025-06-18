import { TodoItem } from "./todo-item";
import { TodoProject } from "./todo-project";


function createAddProjectForm(projectsList) {
    const addProjectForm = new AddForm('Add project', projectsList);
    addProjectForm.addTextInput('Name: ', 'name');
    addProjectForm.addButton('Add Project');

    const addButton = addProjectForm.container.querySelector('#form-add-button');
    addButton.addEventListener('click', () => {
        const name = document.querySelector('#name').value;
        document.querySelector('#container').removeChild(document.querySelector('#add-form'));
        const project = new TodoProject(name);
        projectsList.addProject(project);
        updateProjectsSection(projectsList);
    });
    addProjectForm.display();
}

function createAddItemForm(project) {
    const addItemForm = new AddForm('Add to-do item');
    addItemForm.addTextInput('Title: ', 'title');
    addItemForm.addTextInput('Description: ', 'description');
    addItemForm.addTextInput('Due date: ', 'due-date');
    addItemForm.addTextInput('Priority', 'priority');
    addItemForm.addButton('Add To-do Item');

    addItemForm.display();

    const addButton = document.querySelector('#form-add-button');
    addButton.addEventListener('click', () => {
        const title = addItemForm.container.querySelector('#title').value;
        const description = addItemForm.container.querySelector('#description').value;
        const dueDate = addItemForm.container.querySelector('#due-date').value;
        const priority = addItemForm.container.querySelector('#priority').value;
        document.querySelector('#container').removeChild(addItemForm.container);

        const item = new TodoItem(title, description, dueDate, priority);
        project.addItem(item);
        project.populateItems();
    });
}



function updateProjectsSection(projectsList) {
    const projectsListSection = document.querySelector('#projects-list');
    projectsListSection.innerHTML = '';

    for (const project of projectsList.projects) {
        const projectItem = document.createElement('li');
        projectItem.id = 'project';
        projectItem.innerText = project.name;
        projectItem.addEventListener('click', () => {
            project.populateItems();
        });
        projectsListSection.appendChild(projectItem);
    }
}

class AddForm {
    constructor(title) {
        this.container = document.createElement('div');
        this.container.id = 'add-form';

        const titleRow = document.createElement('div');

        const titleText = document.createElement('div');
        titleText.innerText = title;

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

    addTextInput(label, id) {
        const inputRow = document.createElement('p');
        const labelElement = document.createElement('label');
        labelElement.for = id;
        labelElement.innerText = label;
        const input = document.createElement('input');
        input.id = id;

        inputRow.appendChild(labelElement);
        inputRow.appendChild(input);

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

export {createAddProjectForm, createAddItemForm, updateProjectsSection, AddForm};