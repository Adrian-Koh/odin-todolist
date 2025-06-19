class TodoItem {
    constructor(title, description, dueDate, priority, id = -1) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        if (id === -1)
            this.id = crypto.randomUUID();
    }

    setComplete() {
        this.completed = true;
    }
}

export {TodoItem};