import { TodoItem } from "./todo-item.js";

class TodoProject {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        let removeIndex = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (item.id === this.items[i]) {
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