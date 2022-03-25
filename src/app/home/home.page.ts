import { ModifyListComponent } from '../modals/modify-list/modify-list.component';
import { ListService } from '../services/list.service';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Observable } from 'rxjs';
import { List } from '../models/list';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public lists$: Observable<List[]>;

  constructor(public listService: ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.lists$ = this.listService.getTodoLists();
  }

  async addNewTodoList() {
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    modal.present();
  }

  async modifyTodoListName(id: string) {
    const modal = await this.modalController.create({
      component: ModifyListComponent,
      componentProps: {
        id: id
      },
    });
    modal.present();
  }

  removeTodoList(id: string) {
    this.listService.removeTodoList(id);
    console.log(this.listService.getTodoLists());
  }

}
