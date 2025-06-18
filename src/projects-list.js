class ProjectsList {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    getProject(name) {
        for (const project of this.projects) {
            if (name === project.name) {
                return project;
            }
        }
        return null;
    }
}

export {ProjectsList};