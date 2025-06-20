import { TodoProject } from "./todo-project";
import { formatDate } from "./date-verify";
import { createEditItemForm } from "./add-form";

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

            if (storage.projectsList.projects.length === 0)
                storage.addProject(new TodoProject('Main'));

            updateProjectsSection(storage);
            populateTodoItems(storage, storage.projectsList.projects[0]);
        });
        projectItem.appendChild(removeBtn);

        projectItem.addEventListener('click', (event) => {
            if (event.target.id !== 'remove-project')
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
        itemDueDate.innerText = 'due by ' + formatDate(item.dueDate);
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

        const completeBtn = document.createElement('button');
        completeBtn.className = 'item-complete';
        completeBtn.innerText = '\u2713';
        completeBtn.addEventListener('click', () => {
            item.setComplete();
            storage.updateStorage();
            const completedItem = itemSection.querySelector('.item-completed');
            if (completedItem)
                completedItem.innerText = item.completed ? 'completed' : 'not completed';
        });

        const removeBtn = document.createElement('button');
        removeBtn.className = 'item-remove';
        removeBtn.innerText = '\u2BBF';
        removeBtn.addEventListener('click', () => {
            todoItems.removeChild(itemSection);
            storage.removeItem(project, item);
        });

        const editBtn = document.createElement('button');
        editBtn.className = 'item-edit';
        editBtn.innerText = 'Edit';
        editBtn.addEventListener('click', () => {
            createEditItemForm(storage, project, item);
        });

        buttons.appendChild(detailsBtn);
        buttons.appendChild(collapseBtn);
        buttons.appendChild(completeBtn);
        buttons.appendChild(removeBtn);
        buttons.appendChild(editBtn);
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

    const completedItem = document.createElement('div');
    completedItem.className = 'item-completed';
    completedItem.innerText = item.completed ? 'completed' : 'not completed';

    itemSection.appendChild(descriptionItem);
    itemSection.appendChild(priorityItem);
    itemSection.appendChild(completedItem);
}

function collapseDetails(itemSection) {
    const descriptionItem = itemSection.querySelector('.item-description');
    const priorityItem = itemSection.querySelector('.item-priority');
    const completedItem = itemSection.querySelector('.item-completed');
    itemSection.removeChild(descriptionItem);
    itemSection.removeChild(priorityItem);
    itemSection.removeChild(completedItem);
}

export {updateProjectsSection, populateTodoItems};