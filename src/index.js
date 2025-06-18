import './styles.css';
import { TodoProject } from "./todo-project";
import { AddForm, updateProjectsSection, createAddProjectForm } from "./add-form";
import { ProjectsList } from './projects-list';

const projectList = new ProjectsList();

document.querySelector('#add-new-project').addEventListener('click', () => {
    createAddProjectForm(projectList);
    console.log(projectList.projects);
});

document.querySelector('#add-new-item').addEventListener('click', () => {

});