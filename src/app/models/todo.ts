export class Todo {
    name: string;
    description: string;
    isDone: boolean;

    constructor(name: string, description: string, isDone : boolean = false) {
        this.name = name;
        this.description = description;
        this.isDone = isDone;
    }
}
