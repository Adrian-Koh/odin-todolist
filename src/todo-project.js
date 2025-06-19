import { TodoItem } from "./todo-item.js";

class TodoProject {
    constructor(name, id = -1) {
        this.name = name;
        this.items = [];
        this.id = id === -1 ? crypto.randomUUID() : id;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        let removeIndex = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (item.id === this.items[i].id) {
                removeIndex = i;
                break;
            }
        }

        if (removeIndex !== -1) {
            this.items.splice(removeIndex, 1);
        }
    }

    populateItems() {
        const projectTitle = document.querySelector('#content-project-title');
        projectTitle.innerText = this.name;

        const todoItems = document.querySelector('#content-todo-list');
        todoItems.innerHTML = '';
        
        for (const item of this.items) {
            const itemSection = document.createElement('div');
            itemSection.innerText = item.title + '\n' + item.description;
            itemSection.id = 'todo-item';

            todoItems.appendChild(itemSection);
        }
    }
}

export {TodoProject};