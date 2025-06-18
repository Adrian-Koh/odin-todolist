import { TodoProject } from "./todo-project";
import { createAddProjectForm } from "./add-project-form";

function initializeListeners() {
    document.querySelector('#add-new-project').addEventListener('click', () => {
        createAddProjectForm();
    });

    document.querySelector('#add-new-item').addEventListener('click', () => {

    });
}


function displayAddProject() {

}

export {initializeListeners};