import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})

export class CreateTodoComponent implements OnInit {

  @Input() listId: string;
  todo: Todo = new Todo('', '');
  // list$: Observable<List>;

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  addTodo() {
    this.listService.createTodo(this.listId, this.todo);
    this.modalController.dismiss();
  }
}
