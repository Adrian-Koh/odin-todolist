import './styles.css';
import { TodoProject } from "./todo-project";
import { ProjectList } from "./add-project-form";

const projectList = new ProjectList();

document.querySelector('#add-new-project').addEventListener('click', () => {
    projectList.createAddProjectForm();
    console.log(projectList.projects);
});

document.querySelector('#add-new-item').addEventListener('click', () => {

});