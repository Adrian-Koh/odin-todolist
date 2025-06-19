class TodoItem {
    constructor(title, description, dueDate, priority, id = -1) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = id === -1 ? crypto.randomUUID : id;
    }

    setComplete() {
        this.completed = true;
    }
}

export {TodoItem};