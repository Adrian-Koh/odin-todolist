class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.id = crypto.randomUUID();
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    setComplete() {
        this.completed = true;
    }
}

export {TodoItem};