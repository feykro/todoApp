import { Todo } from './../models/todo';
import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private todoLists: List[] = []; // liste de todoList aka List

  constructor(private afs: AngularFirestore) { }

  public init() {
    this.createTodoList("liste des courses");
    this.createTodoList("liste des BG de la classe");
    this.createTodo("Etienne", "Le bg aux yeux bleus qui aimait un peu trop les autres hommes, mais qui suis-je pour juger ?", 1);
  }


  public getTodoLists() {
    return this.afs.collection<List>('ShoppingLists').valueChanges({ idField: "id" })
      .pipe(tap(console.log),
        map(lists => lists.map(list => ({
          ...list,
          amountCompleted: list.todos.filter(todo => todo.isDone).length
        }))));

  }

  public changeName(indice: number, newName: string) {
    this.todoLists[indice].name = newName;
  }

  public createTodoList(name: string) {
    var newList: List = new List(name);
    this.todoLists.push(newList);
  }

  public createTodo(name: string, description: string, id: number) {
    let newTodo = new Todo(name, description);
    this.todoLists[id].todos.push(newTodo);
  }

  public getList(id: number): Observable<List> {
    // TODO passer en afs
    return this.todoLists[id];
  }


  public removeTodoList(id: number) {
    this.todoLists.splice(id, 1);
  }

  public modifyTodo(listId: number, todoId: number, newName: string, newDescription: string) {
    let list: List = this.todoLists[listId];
    list.todos[todoId].description = newDescription;
    list.todos[todoId].name = newName;
  }

  public removeTodo(idList: number, idTodo: number) {
    this.todoLists[idList].todos.splice(idTodo, 1);
  }

}
