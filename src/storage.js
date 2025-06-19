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
                this.projectsList.addProject(new TodoProject(project.name));
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
}

export {Storage};