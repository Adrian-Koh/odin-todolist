import './styles.css';
import { TodoProject } from "./todo-project";
import { AddForm, createAddProjectForm, createAddItemForm } from "./add-form";
import { ProjectsList } from './projects-list'
import { Storage } from './storage.js';
import { populateTodoItems, updateProjectsSection } from './dom-logic.js';


const storage = new Storage();
let currentProject = null;
updateProjectsSection(storage);

document.querySelector('#add-new-project').addEventListener('click', () => {
    createAddProjectForm(storage);
});

document.querySelector('#add-new-item').addEventListener('click', () => {
    if (currentProject) {
        createAddItemForm(storage, currentProject);
    }
    else {
        alert('Select a project before adding a to-do item.');
    }
});

const projectsListSection = document.querySelector('#projects-list');
projectsListSection.addEventListener('click', (event) => {
    if (event.target.className === 'project') {
        currentProject = storage.projectsList.getProject(event.target.id);
        populateTodoItems(currentProject);
    }
});
