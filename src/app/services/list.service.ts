import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public todoLists: List[] = []; //liste de todoList aka List

  constructor() {}

  public init(){
    this.createTodoList("liste des courses");
    this.createTodoList("liste des BG de la classe");
    this.createTodo("Etienne", "Le bg aux yeux bleus", 1);
  }

  public createTodoList(name: string){
    var newList : List = new List(name);
    this.todoLists.push(newList);
  }

  public createTodo(name: string, description: string, id: number){
    let newTodo = new Todo(name, description);
    this.todoLists[id].todos.push(newTodo);
  }

  public getList(id: number) : List{
    return this.todoLists[id];
  }

  public getTodoLists(){
    return this.todoLists;
  }

  public removeTodoList(id : number){
    this.todoLists.splice(id, 1);
  }

}
