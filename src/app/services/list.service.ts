import { Todo } from '../models/todo';
import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore'

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

  public createTodo(todoName: string, todoDescription: string, id: string) {
    this.afs.doc<any>(`ShoppingLists/${id}`).update({
      todos: arrayUnion({
        name: todoName,
        isDone: false,
        description: todoDescription
      })
    });
  }

  public getList(id: string): Observable<List> {
    return this.afs.doc<List>(`ShoppingLists/${id}`).valueChanges({ idField: "id" });
  }

  public removeTodoList(id: string) {
    this.afs.doc<List>(`ShoppingLists/${id}`).delete();
  }

  // public modifyTodo(listId: number, todoId: number, newName: string, newDescription: string) {
  //   let list: List = this.todoLists[listId];
  //   list.todos[todoId].description = newDescription;
  //   list.todos[todoId].name = newName;
  // }

  // public removeTodo(idList: number, idTodo: number) {
  //   this.todoLists[idList].todos.splice(idTodo, 1);
  // }

}
