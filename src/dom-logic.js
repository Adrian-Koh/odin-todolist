function updateProjectsSection(storage) {
    const projectsListSection = document.querySelector('#projects-list');
    projectsListSection.innerHTML = '';

    for (const project of storage.projectsList.projects) {
        const projectItem = document.createElement('li');
        projectItem.className = 'project';
        projectItem.id = project.id;
        projectItem.innerText = project.name;

        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'X';
        removeBtn.id = 'remove-project';
        removeBtn.addEventListener('click', () => {
            storage.removeProject(project);
            updateProjectsSection(storage);
        });
        projectItem.appendChild(removeBtn);

        projectItem.addEventListener('click', () => {
            populateTodoItems(storage, project);
        });
        projectsListSection.appendChild(projectItem);
    }
}

function populateTodoItems(storage, project) {
    const projectTitle = document.querySelector('#content-project-title');
    projectTitle.innerText = project.name;

    const todoItems = document.querySelector('#content-todo-list');
    todoItems.innerHTML = '';
    
    for (const item of project.items) {
        const itemSection = document.createElement('div');
        itemSection.id = 'todo-item';
        itemSection.className = item.priority;

        const itemTitle = document.createElement('div');
        itemTitle.innerText = item.title;
        itemTitle.className = 'todo-item-title';
        itemSection.appendChild(itemTitle);

        const itemDueDate = document.createElement('div');
        itemDueDate.innerText = 'due by ' + item.dueDate;
        itemDueDate.className = 'todo-item-duedate';
        itemSection.appendChild(itemDueDate);

        const buttons = document.createElement('div');
        buttons.className = 'todo-item-buttons';
        itemSection.appendChild(buttons);

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'item-details';
        detailsBtn.innerText = '\u2BC6';
        detailsBtn.addEventListener('click', () => {
            collapseBtn.style.display = 'inline';
            detailsBtn.style.display = 'none';
            revealDetails(itemSection, item);
        });

        const collapseBtn = document.createElement('button');
        collapseBtn.className = 'item-details-collapse';
        collapseBtn.innerText = '\u2BC5';
        collapseBtn.style.display = 'none';
        collapseBtn.addEventListener('click', () => {
            collapseBtn.style.display = 'none';
            detailsBtn.style.display = 'inline';
            collapseDetails(itemSection);
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'item-remove';
        removeBtn.innerText = '\u2BBF';
        removeBtn.addEventListener('click', () => {
            todoItems.removeChild(itemSection);
            storage.removeItem(project, item);
        });

        buttons.appendChild(detailsBtn);
        buttons.appendChild(collapseBtn);
        buttons.appendChild(removeBtn);
        todoItems.appendChild(itemSection);
    }
}

function revealDetails(itemSection, item) {
    const descriptionItem = document.createElement('div');
    descriptionItem.className = 'item-description';
    descriptionItem.innerText = item.description;

    const priorityItem = document.createElement('div');
    priorityItem.className = 'item-priority';
    priorityItem.innerText = item.priority + ' priority';

    itemSection.appendChild(descriptionItem);
    itemSection.appendChild(priorityItem);
}

function collapseDetails(itemSection) {
    const descriptionItem = itemSection.querySelector('.item-description');
    const priorityItem = itemSection.querySelector('.item-priority');
    itemSection.removeChild(descriptionItem);
    itemSection.removeChild(priorityItem);
}

export {updateProjectsSection, populateTodoItems};