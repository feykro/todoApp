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

  private todoLists: List[] = []; // TODO à sortir

  constructor(private afs: AngularFirestore) { }

  public getTodoLists() {
    return this.afs.collection<List>('ShoppingLists').valueChanges({ idField: "id" })
      .pipe(tap(console.log),
        map(lists => lists.map(list => ({
          ...list,
          amountCompleted: list.todos.filter(todo => todo.isDone).length
        }))));
  }

  public changeName(id: string, newName: string) {
    this.afs.doc<List>(`ShoppingLists/${id}`).update({ name: newName });
  }

  public createTodoList(name: string) {
    const newList: List = new List(name);


    this.todoLists.push(newList); // TODO à sortir
  }

  public createTodo(name: string, description: string, id: number) {
    const newTodo = new Todo(name, description);


    this.todoLists[id].todos.push(newTodo);
  }

  public getList(id: string): Observable<List> {
    return this.afs.doc<List>(`ShoppingLists/${id}`).valueChanges({ idField: "id" });
  }


  public removeTodoList(id: string) {
    this.afs.doc<List>(`ShoppingLists/${id}`).delete();
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
