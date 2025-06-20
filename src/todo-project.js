import { TodoItem } from "./todo-item.js";

class TodoProject {
    constructor(name, storage, id = -1) {
        this.name = name;
        this.storage = storage;
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
}

export {TodoProject};