import { ModifyTodoComponent } from './../../modals/modify-todo/modify-todo.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/list.service';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { Observable } from 'rxjs';
import { ItemToShop } from 'src/app/models/item-to-shop';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public shoppingList$: Observable<ShoppingList>;
  private shoppingListId: string;

  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.shoppingListId = this.route.snapshot.params['id'];
    this.shoppingList$ = this.shoppingListService.getShoppingList(this.shoppingListId);
  }

  onEvent(event, itemToShop: ItemToShop) {

    console.log(itemToShop);
    itemToShop.isDone = !itemToShop.isDone;
    console.log(itemToShop);

    this.shoppingListService.modifyItemToShop(this.shoppingListId, itemToShop);

    event.stopPropagation();
  }

  async createItemToShop() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        shoppingListId: this.shoppingListId,
      },
    });
    modal.present();
  }

  async modifyItemToShop(itemToShop: ItemToShop) {
    const modal = await this.modalController.create({
      component: ModifyTodoComponent,
      showBackdrop: true,
      backdropDismiss: true,
      componentProps: {
        shoppingListId: this.shoppingListId,
        itemToShop: itemToShop
      }
    });
    modal.present();
  }

  removeItemToShop(itemToShop: ItemToShop) {
    this.shoppingListService.removeItemToShop(this.shoppingListId, itemToShop.id);
  }

}
