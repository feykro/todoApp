import { Todo } from "./todo";

export class List {
    name : string;
    todos : Todo[];

    constructor(name: string) {
        this.name = name;
        this.todos = [];
    }

    getAmountCompleted() : number{
        let res = 0;
        for (var t of this.todos){
            if (t.isDone){
                res++;
            }
        }
        return res;
    }
}
