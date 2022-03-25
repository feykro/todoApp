export class Todo {
    name: string;
    isDone: boolean;
    description: string;

    constructor(name: string, description: string, isDone: boolean = false) {
        this.name = name;
        this.description = description;
        this.isDone = isDone
    }
}
