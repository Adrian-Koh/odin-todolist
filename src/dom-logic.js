function updateProjectsSection(storage) {
    const projectsListSection = document.querySelector('#projects-list');
    projectsListSection.innerHTML = '';

    for (const project of storage.projectsList.projects) {
        const projectItem = document.createElement('li');
        projectItem.className = 'project';
        projectItem.id = project.id;
        projectItem.innerText = project.name;

        const removeBtn = document.createElement('button');
        removeBtn.innerText = '\u2BBF';
        removeBtn.id = 'remove-project';
        removeBtn.addEventListener('click', () => {
            storage.removeProject(project);
            updateProjectsSection(storage);
        });
        projectItem.appendChild(removeBtn);

        projectItem.addEventListener('click', () => {
            populateTodoItems(project);
        });
        projectsListSection.appendChild(projectItem);
    }
}

function populateTodoItems(project) {
    const projectTitle = document.querySelector('#content-project-title');
    projectTitle.innerText = project.name;

    const todoItems = document.querySelector('#content-todo-list');
    todoItems.innerHTML = '';
    
    for (const item of project.items) {
        const itemSection = document.createElement('div');
        itemSection.innerText = item.title + '\ndue by ' + item.dueDate;
        itemSection.id = 'todo-item';

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'item-details';
        detailsBtn.innerText = '\u2BC6';
        detailsBtn.addEventListener('click', () => {
            revealDetails(itemSection, item);
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'item-remove';
        removeBtn.innerText = '\u2BBF';

        itemSection.appendChild(detailsBtn);
        itemSection.appendChild(removeBtn);
        todoItems.appendChild(itemSection);
    }
}

function revealDetails(itemSection, item) {
    const descriptionItem = document.createElement('div');
    descriptionItem.innerText = item.description;

    const priorityItem = document.createElement('div');
    priorityItem.innerText = item.priority;

    itemSection.appendChild(descriptionItem);
    itemSection.appendChild(priorityItem);
}

export {updateProjectsSection, populateTodoItems};