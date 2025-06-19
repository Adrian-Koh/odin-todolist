import { ProjectsList } from './projects-list';
import { TodoItem } from './todo-item';
import { TodoProject } from './todo-project';

class Storage {
    static ProjectsListName = 'ProjectList';

    constructor() {
        let projectsListRaw = localStorage.getItem(Storage.ProjectsListName);
        this.projectsList = new ProjectsList();

        if (projectsListRaw) {
            let projectListObj = JSON.parse(projectsListRaw);

            for (const project of projectListObj.projects) {
                const projectObj = new TodoProject(project.name);
                for (const item of project.items) {
                    let itemObj = new TodoItem(item.title, item.description, item.dueDate, item.priority, item.id);
                    projectObj.addItem(itemObj);
                }
                this.projectsList.addProject(projectObj);
            }
        }
        else {
            localStorage.setItem(Storage.ProjectsListName, JSON.stringify(this.projectsList));
        }

    }

    addProject(project) {
        this.projectsList.addProject(project);
        localStorage.setItem(Storage.ProjectsListName, JSON.stringify(this.projectsList));
    }

    addItem(project, item) {
        for (const proj of this.projectsList.projects) {
            if (proj.name === project.name) {
                proj.addItem(item);
            }
        }
        localStorage.setItem(Storage.ProjectsListName, JSON.stringify(this.projectsList));
    }
}

export {Storage};