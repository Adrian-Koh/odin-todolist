class ProjectsList {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    getProject(id) {
        for (const project of this.projects) {
            if (id === project.id) {
                return project;
            }
        }
        return null;
    }
}

export {ProjectsList};