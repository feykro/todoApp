import { ModalController } from '@ionic/angular';
import { ShoppingListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/models/shopping-list';
import { EMPTY } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from 'firebase/app';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})

export class CreateListComponent implements OnInit {

  public shoppingList: ShoppingList = {
    name: '',
    // itemsToShop$: EMPTY,
    owner: '',
    canRead: [],
    canWrite: []
  }

  private user: string;

  constructor(private shoppingListService: ShoppingListService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.user = getAuth().currentUser.email;
  }

  createShoppingList() {
    if (!this.shoppingList.name) {
      this.shoppingList.name = 'default';
    }

    this.shoppingList.owner = this.user;
    this.shoppingList.canRead.push(this.user);
    this.shoppingList.canWrite.push(this.user);

    this.shoppingListService.createShoppingList(this.shoppingList);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
