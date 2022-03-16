import { ModifyListComponent } from './../modals/modify-list/modify-list.component';
import { CreateListComponent } from './../modals/create-list/create-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, CreateListComponent, ModifyListComponent]
})
export class HomePageModule { }
