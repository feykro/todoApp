import { ModifyTodoComponent } from './../../modals/modify-todo/modify-todo.component';
import { DisplayImageComponent } from './../../modals/display-image/display-image.component';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/models/list';
import { ListService } from 'src/app/services/list.service';
import { EMPTY, Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public list$: Observable<List> = EMPTY; // TODO à sortir
  private id: string;

  constructor(private listService: ListService, private modalController: ModalController, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.list$ = this.listService.getList(this.id);
  }

  onEvent(event) {
    event.stopPropagation();
  }

  goBack() {
    this.location.back();
  }

  async addNewTodo() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        listId: this.id,
        // list$: this.list$
      },
    });
    modal.present();
  }

  async modifyTodo(todoIn: Todo) {
    const modal = await this.modalController.create({
      component: ModifyTodoComponent,
      componentProps: {
        todo: todoIn,
        id: this.id
      }
    });
    modal.present();
  }

  async displayImage() {
    const modal = await this.modalController.create({
      component: DisplayImageComponent,
      //  TODO: pass the right image
    });
    modal.present();
  }

  removeTodo(todo: Todo) {
    this.listService.removeTodo(this.id, todo);
  }

}
