import { v4 as uuidv4 } from "uuid";

class Task {
    id: string;
    title!: string;
    description?: string;
    subtasks?: Task[];
    done: boolean = false;
    isEditMode?: true;

    constructor(title: string, description?: string) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
    }
}

export default Task;
