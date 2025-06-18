import './styles.css';
import { TodoProject } from "./todo-project";
import { AddForm, updateProjectsSection, createAddProjectForm, createAddItemForm } from "./add-form";
import { ProjectsList } from './projects-list';

const projectList = new ProjectsList();
let currentProject = null;

document.querySelector('#add-new-project').addEventListener('click', () => {
    createAddProjectForm(projectList);
    console.log(projectList.projects);
});

document.querySelector('#add-new-item').addEventListener('click', () => {
    if (currentProject) {
        createAddItemForm(currentProject);
    }
    else {
        alert('Select a project before adding a to-do item.');
    }
});

const projectsListSection = document.querySelector('#projects-list');
projectsListSection.addEventListener('click', (event) => {
    if (event.target.id === 'project') {
        currentProject = projectList.getProject(event.target.innerText);
        currentProject.populateItems();
    }
});