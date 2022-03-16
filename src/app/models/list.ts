import { Todo } from "./todo";

export class List {
    id?: string;
    name: string;
    todos: Todo[];
    amountCompleted?: number;

    constructor(name: string) {
        this.name = name;
        this.todos = [];
    }
}
