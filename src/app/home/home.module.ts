import { ModifyListComponent } from '../modals/modify-list/modify-list.component';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { ShareShoppingListComponent } from '../modals/share-shopping-list/share-shopping-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, CreateListComponent, ModifyListComponent, ShareShoppingListComponent]
})
export class HomePageModule { }
