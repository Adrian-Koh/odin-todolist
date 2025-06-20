class TodoItem {
    constructor(title, description, dueDate, priority, id = -1, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.id = id === -1 ? crypto.randomUUID() : id;
    }

    setComplete() {
        this.completed = true;
    }

    editDetails(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export {TodoItem};