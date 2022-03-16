import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modify-todo',
  templateUrl: './modify-todo.component.html',
  styleUrls: ['./modify-todo.component.scss'],
})
export class ModifyTodoComponent implements OnInit {

  todoName: string = '';
  description: string = '';
  todoInd: number;
  list$: List;

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  modifyTodo() {
    //  TODO: add the call to the new service
    //  this.listService.modifyTodo(this.ind, this.todoInd, this.todoName, this.description);
    this.modalController.dismiss();
  }

}
