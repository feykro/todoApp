import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modify-todo',
  templateUrl: './modify-todo.component.html',
  styleUrls: ['./modify-todo.component.scss'],
})
export class ModifyTodoComponent implements OnInit {

  todoName: string = '';
  description: string = '';
  ind : number;
  todoInd: number;

  constructor(private listService : ListService, private modalController : ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }

  modifyTodo(){
    this.listService.modifyTodo(this.ind, this.todoInd, this.todoName, this.description);
    this.modalController.dismiss();
  }

}
