import { ProjectsList } from './projects-list';
import { TodoItem } from './todo-item';
import { TodoProject } from './todo-project';

class Storage {
    static ProjectsListName = 'ProjectsList';

    constructor() {
        let projectsListRaw = localStorage.getItem(Storage.ProjectsListName);
        this.projectsList = new ProjectsList();

        if (projectsListRaw) {
            this.deserialize(projectsListRaw);
        }
        else {
            this.updateStorage();
        }
    }

    deserialize(projectsListRaw) {
        let projectListObj = JSON.parse(projectsListRaw);

        for (const project of projectListObj.projects) {
            const projectObj = new TodoProject(project.name, project.id);
            for (const item of project.items) {
                let itemObj = new TodoItem(item.title, item.description, item.dueDate, item.priority, item.id);
                projectObj.addItem(itemObj);
            }
            this.projectsList.addProject(projectObj);
        }
    }

    updateStorage() {
        localStorage.setItem(Storage.ProjectsListName, JSON.stringify(this.projectsList));
    }

    addProject(project) {
        this.projectsList.addProject(project);
        this.updateStorage();
    }

    addItem(project, item) {
        for (const proj of this.projectsList.projects) {
            if (proj.name === project.name) {
                proj.addItem(item);
            }
        }
        this.updateStorage();
    }
}

export {Storage};