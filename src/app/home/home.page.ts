import { ModifyListComponent } from '../modals/modify-list/modify-list.component';
import { ShoppingListService } from '../services/list.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Observable } from 'rxjs';
import { ShoppingList } from '../models/shopping-list';
import { ItemToShop } from '../models/item-to-shop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public shoppingLists$: Observable<ShoppingList[]>;
  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  ngOnInit() {
    this.shoppingLists$ = this.shoppingListService.getShoppingLists();
  }

  async createShoppingList() {
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    modal.present();
  }

  async modifyShoppingList(shoppingList: ShoppingList) {
    const modal = await this.modalController.create({
      component: ModifyListComponent,
      componentProps: {
        shoppingList: shoppingList
      },
    });
    modal.present();
  }

  isCompleted(itemsToShop: ItemToShop[]): boolean {
    return this.completedItemToShop(itemsToShop) === this.totalItemToShop(itemsToShop);
  }

  completedItemToShop(itemsToShop: ItemToShop[]): number {
    return itemsToShop.filter(itemToShop => itemToShop.isDone).length;
  }

  totalItemToShop(itemsToShop: ItemToShop[]): number {
    return itemsToShop.length;
  }

  removeShoppingList(shoppingList: ShoppingList) {
    this.shoppingListService.removeShoppingList(shoppingList);
  }

}
