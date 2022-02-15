import { ModifyTodoComponent } from './../../modals/modify-todo/modify-todo.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public currentList : List;
  public listInd : number;

  constructor(public listService : ListService, public modalController: ModalController, private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.listInd = params['listInd'];
      this.currentList = this.listService.getList(this.listInd);
   });
  }

  async addNewTodo(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        ind: this.listInd
      },
    });
    modal.present();
  }

  async modifyTodo(todoInd: number){
    const modal = await this.modalController.create({
      component: ModifyTodoComponent,
      componentProps: {
        ind: this.listInd,
        todoInd: todoInd,
      }
    });
    modal.present();
  }

}
