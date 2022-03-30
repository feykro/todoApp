import { ModifyTodoComponent } from './../../modals/modify-todo/modify-todo.component';
import { CreateTodoComponent } from './../../modals/create-todo/create-todo.component';
import { DisplayImageComponent } from './../../modals/display-image/display-image.component';
import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailsPageRoutingModule,
  ],
  declarations: [ListDetailsPage, CreateTodoComponent, ModifyTodoComponent, DisplayImageComponent]
})

export class ListDetailsPageModule {

}
