import { ModalController } from '@ionic/angular';
import { ShoppingListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/models/shopping-list';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})

export class CreateListComponent implements OnInit {

  public shoppingList: ShoppingList = {
    name: '',
  }

  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  ngOnInit() { }

  createShoppingList() {
    if (!this.shoppingList.name) {
      this.shoppingList.name = 'default';
    }
    this.shoppingListService.createShoppingList(this.shoppingList);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
