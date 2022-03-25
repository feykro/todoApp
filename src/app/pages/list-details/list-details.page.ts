import { ModifyTodoComponent } from './../../modals/modify-todo/modify-todo.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public list$: Observable<List> = EMPTY; // TODO à sortir
  public id: string;

  constructor(public listService: ListService, public modalController: ModalController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.list$ = this.listService.getList(this.id);
  }

  onEvent(event) {
    event.stopPropagation();
  }

  async addNewTodo() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        listId: this.id,
        list$: this.list$
      },
    });
    modal.present();
  }

  async modifyTodo(todoInd: number) {
    const modal = await this.modalController.create({
      component: ModifyTodoComponent,
      componentProps: {
        list$: this.list$,
        todoInd: todoInd,
      }
    });
    modal.present();
  }

}
