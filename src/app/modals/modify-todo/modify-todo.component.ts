import { Component, Input, OnInit } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { List } from 'src/app/models/list';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modify-todo',
  templateUrl: './modify-todo.component.html',
  styleUrls: ['./modify-todo.component.scss'],
})
export class ModifyTodoComponent implements OnInit {
  @Input() todo: Todo;
  @Input() id: string;

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  modifyTodo() {
    this.listService.modifyTodo(this.id, this.todo);
    this.dismissModal();
  }

}
