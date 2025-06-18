import { TodoProject } from "./todo-project";

class ProjectList {
    constructor() {
        this.projects = [];
    }

    createAddProjectForm() {
        console.log('Hello');
        
        const container = document.createElement('div');

        const closeButtonRow = document.createElement('p');
        const closeButton = document.createElement('button');
        closeButton.id = 'close-add-project';
        closeButton.innerText = 'X';
        closeButtonRow.appendChild(closeButton);

        const nameRow = document.createElement('p');
        const nameLabel = document.createElement('label');
        nameLabel.for = 'name';
        nameLabel.innerText = 'Name: ';
        const nameInput = document.createElement('input');
        nameInput.id = 'name';

        nameRow.appendChild(nameLabel);
        nameRow.appendChild(nameInput);

        const addButtonRow = document.createElement('p');
        const addButton = document.createElement('button');
        addButton.innerText = 'Add Project';
        addButton.id = 'add-project';

        addButtonRow.appendChild(addButton);

        container.appendChild(closeButtonRow);
        container.appendChild(nameRow);
        container.appendChild(addButtonRow);

        container.style.position = 'absolute';
        container.style.backgroundColor = 'aqua';
        container.style.top = '30%';
        container.style.left = '50%';
        document.querySelector('#container').appendChild(container);

        closeButton.addEventListener('click', () => {
            document.querySelector('#container').removeChild(container);
        });

        addButton.addEventListener('click', () => {
            document.querySelector('#container').removeChild(container);
            this.projects.push(new TodoProject(nameInput.value));
        });
    }
}

export {ProjectList};