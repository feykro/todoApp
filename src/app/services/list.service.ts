import { Injectable } from '@angular/core';
import { ShoppingList } from '../models/shopping-list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ItemToShop } from '../models/item-to-shop';
import { getAuth } from '@angular/fire/auth';
import { arrayUnion, arrayRemove } from "firebase/firestore"

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingLists: Observable<ShoppingList[]>;

  constructor(private afs: AngularFirestore) {

    const userEmail: string = getAuth().currentUser.email;

    const shoppingListsCollection$ = this.afs.collection<ShoppingList>('ShoppingLists', ref =>
      ref.where('canRead', 'array-contains', userEmail).orderBy('name', 'asc')).valueChanges({ idField: "id" });

    this.shoppingLists = shoppingListsCollection$.pipe(map(shoppingLists => shoppingLists.map(shoppingList => {
      shoppingList.itemsToShop$ = this.getItemsToShop(shoppingList.id);
      return shoppingList;
    })));
  }

  // https://github.com/angular/angularfire/blob/master/docs/firestore/documents.md

  public getShoppingLists(): Observable<ShoppingList[]> {
    return this.shoppingLists;
  }

  public getShoppingList(shoppingListId: string): Observable<ShoppingList> {
    return this.afs.doc<ShoppingList>(`ShoppingLists/${shoppingListId}`).valueChanges({ idField: "id" })
      .pipe(map(shoppinglist => {
        shoppinglist.itemsToShop$ = this.getItemsToShop(shoppingListId);
        return (shoppinglist);
      }));
  }

  private getItemsToShop(shoppingListId: string): Observable<ItemToShop[]> {
    return this.afs.collection<ItemToShop>(`ShoppingLists/${shoppingListId}/ItemsToShop`).valueChanges({ idField: "id" });
  }

  public createShoppingList(shoppingList: ShoppingList) {
    this.afs.collection<ShoppingList>('ShoppingLists').add({ ...shoppingList });
  }

  public modifyShoppingList(shoppingList: ShoppingList) {
    // We can only update fields that are not dertermined by firestore
    // Currently, it is consists only in the shoppingList name
    // TODO : rename this function
    this.afs.doc<ShoppingList>(`ShoppingLists/${shoppingList.id}`).update({ name: shoppingList.name });
  }

  public modifyShoppingListShares(shoppingListId: string, recipient: string, canRead: boolean, canWrite: boolean) {
    let sharesUpdate = {};
    if (canRead) {
      sharesUpdate['canRead'] = arrayUnion(recipient);
    }
    if (canWrite) {
      sharesUpdate['canWrite'] = arrayUnion(recipient);
    }

    this.afs.doc<ShoppingList>(`ShoppingLists/${shoppingListId}`).update({ ...sharesUpdate });
  }

  public removeShoppingList(shoppingList: ShoppingList) {
    // Delete each ItemToShop before deleting the ShoppingList (Firestore constraint)
    shoppingList.itemsToShop$.pipe(map(
      itemsToShop => itemsToShop.forEach(itemToShop => this.removeItemToShop(shoppingList.id, itemToShop.id))));
    this.afs.doc<ShoppingList>(`ShoppingLists/${shoppingList.id}`).delete();
  }

  public createItemToShop(shoppingListId: string, itemToShop: ItemToShop) {
    this.afs.collection<ItemToShop>(`ShoppingLists/${shoppingListId}/ItemsToShop`).add({ ...itemToShop });
  }

  public modifyItemToShop(shoppingListId: string, itemToShop: ItemToShop) {
    this.afs.doc<ItemToShop>(`ShoppingLists/${shoppingListId}/ItemsToShop/${itemToShop.id}`).update({ ...itemToShop });
  }

  public removeItemToShop(shoppingListId: string, itemToShopId: string) {
    this.afs.doc<ItemToShop>(`ShoppingLists/${shoppingListId}/ItemsToShop/${itemToShopId}`).delete();
  }

}
