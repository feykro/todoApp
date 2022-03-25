import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})

export class CreateTodoComponent implements OnInit {

  todoName: string = '';
  description: string = '';
  listId: string;
  list$: Observable<List>;

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  addTodo() {
    this.listService.createTodo(this.todoName, this.description, this.listId);
    this.modalController.dismiss();
  }
}
