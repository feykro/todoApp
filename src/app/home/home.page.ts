import { ShoppingListService } from 'src/app/services/list.service';
import { ModifyListComponent } from '../modals/modify-list/modify-list.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Observable } from 'rxjs';
import { ShoppingList } from '../models/shopping-list';
import { ItemToShop } from '../models/item-to-shop';
import { getAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public shoppingLists$: Observable<ShoppingList[]>;
  public searchField: FormControl;
  public filteredList$: Observable<ShoppingList[]>;
  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  ngOnInit() {
    this.shoppingLists$ = this.shoppingListService.getShoppingLists();
    this.searchField = new FormControl('');
    this.filteredList$ = this.shoppingLists$;
  }

  updateSearchField() {
    const search: string = this.searchField.value;

    this.filteredList$ = this.shoppingLists$.pipe(
      map(lists => lists.filter(list => list.name.toLowerCase().includes(search.toLowerCase()))));
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

  userCanWrite(shoppingList: ShoppingList): boolean {
    return shoppingList.canWrite.includes(getAuth().currentUser.email);
  }

  userCanDelete(shoppingList: ShoppingList): boolean {
    return shoppingList.owner === getAuth().currentUser.email;
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
