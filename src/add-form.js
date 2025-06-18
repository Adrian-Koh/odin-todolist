import { TodoItem } from "./todo-item";
import { TodoProject } from "./todo-project";


function createAddProjectForm(projectsList) {
    const addProjectForm = new AddForm('Add project', projectsList);
    addProjectForm.addTextInput('Name: ', 'name');
    addProjectForm.addButton('Add Project');
    addProjectForm.display();
}


function updateProjectsSection(projectsList) {
    const projectsListSection = document.querySelector('#projects-list');
    projectsListSection.innerHTML = '';

    for (const project of projectsList.projects) {
        const projectItem = document.createElement('li');
        projectItem.innerText = project.name;
        projectItem.addEventListener('click', () => {
            project.populateItems();
        });
        projectsListSection.appendChild(projectItem);
    }
}

class AddForm {
    constructor(title, projectsList) {
        this.projectsList = projectsList;

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

        addButton.addEventListener('click', () => {
            const name = document.querySelector('#name').value;
            document.querySelector('#container').removeChild(this.container);
            const project = new TodoProject(name);
            this.projectsList.addProject(project);
            updateProjectsSection(this.projectsList);
        });

        this.container.append(addButton);
    }

    display() {
        const contentContainer = document.querySelector('#container');
        contentContainer.appendChild(this.container);
    }
}

export {createAddProjectForm, updateProjectsSection, AddForm};