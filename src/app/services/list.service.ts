import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore'
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private shoppingLists: Observable<List[]> = EMPTY; // TODO EMPTY à sortir

  constructor(private afs: AngularFirestore) {
    this.shoppingLists = this.afs.collection<List>('ShoppingLists').valueChanges({ idField: "id" })
      .pipe(
        map(lists => lists.map(list => ({
          ...list,
          amountCompleted: list.todos ? list.todos.filter(todo => todo.isDone).length : 0
        }))));
  }

  // https://github.com/angular/angularfire/blob/master/docs/firestore/documents.md

  public getTodoLists() {
    return this.shoppingLists;
  }

  public changeName(id: string, newName: string) {
    this.afs.doc<List>(`ShoppingLists/${id}`).update({ name: newName });
  }

  public createTodoList(newName: string) {
    this.afs.collection('ShoppingLists').add({ name: newName }).then(doc => doc.update({ todos: [] }));
  }

  public createTodo(id: string, todo: Todo) {
    this.afs.doc<any>(`ShoppingLists/${id}`).update({
      todos: arrayUnion({
        name: todo.name,
        isDone: todo.isDone,
        description: todo.description
      })
    });
  }

  public getList(id: string): Observable<List> {
    return this.afs.doc<List>(`ShoppingLists/${id}`).valueChanges({ idField: "id" });
  }

  public removeTodoList(id: string) {
    this.afs.doc<List>(`ShoppingLists/${id}`).delete();
  }

  public modifyTodo(id: string, todo: Todo) {
    this.createTodo(id, todo);
  }

  public removeTodo(idList: string, todo: Todo) {
    this.afs.doc<any>(`ShoppingLists/${idList}`).update({
      todos: arrayRemove({
        name: todo.name,
        isDone: todo.isDone,
        description: todo.description
      })
    });
  }

}
