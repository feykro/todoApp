import { ModifyListComponent } from './../modals/modify-list/modify-list.component';
import { ListService } from './../services/list.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public listService : ListService, public modalController: ModalController, private router: Router) {}

  ngOnInit(){
    this.listService.init();
  }

  addTodoList(){
    this.listService.createTodoList("newList");
    console.log("bonjour");
  }

  async addNewTodoList(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    modal.present();
  }

  gotoListPage(listInd : number){
    this.router.navigate(['list-details', listInd]);
  }

  async modifyTodoListName(indice : number){
    const modal = await this.modalController.create({
      component: ModifyListComponent,
      componentProps: {
        ind: indice
      },
    });
    modal.present();
  }

  removeFromTodoList(indice : number){
    this.listService.removeTodoList(indice);
    console.log(this.listService.getTodoLists());
  }

}
