import { ListService } from './../services/list.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public listService : ListService, public modalController: ModalController) {}

  ngOnInit(){
    this.listService.init();
  }

  addTodoList(){
    this.listService.createTodoList("newList");
    console.log("bonjour");
  }

  removeFromTodoList(indice : number){
    this.listService.removeTodoList(indice);
    console.log(this.listService.getTodoLists());
  }

  async addNewTodoList(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    modal.present();
  }

}
