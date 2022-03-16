import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})

export class CreateTodoComponent implements OnInit {

  todoName: string = '';
  description: string = '';
  ind: number;
  todoInd: number;

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  addTodo() {
    this.listService.createTodo(this.todoName, this.description, this.ind);
    this.modalController.dismiss();
  }
}
