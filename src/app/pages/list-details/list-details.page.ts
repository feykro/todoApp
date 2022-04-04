import { ModifyTodoComponent } from './../../modals/modify-todo/modify-todo.component';
import { DisplayImageComponent } from './../../modals/display-image/display-image.component';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/services/list.service';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { Observable } from 'rxjs';
import { ItemToShop } from 'src/app/models/item-to-shop';
import { ShareShoppingListComponent } from 'src/app/modals/share-shopping-list/share-shopping-list.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  public shoppingList$: Observable<ShoppingList>;
  private shoppingListId: string;

  constructor(private shoppingListService: ShoppingListService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.shoppingListId = this.route.snapshot.params['id'];
    this.shoppingList$ = this.shoppingListService.getShoppingList(this.shoppingListId);
  }

  isDoneChanged(event: CustomEvent, itemToShop: ItemToShop) {
    console.log(event, itemToShop);
    this.shoppingListService.modifyItemToShop(this.shoppingListId, itemToShop);
    event.stopPropagation();
  }

  goBack() {
    this.location.back();
  }
  async createItemToShop() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        shoppingListId: this.shoppingListId,
      },
    });
    modal.present();
  }

  async modifyItemToShop(itemToShop: ItemToShop) {
    const modal = await this.modalController.create({
      component: ModifyTodoComponent,
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

  async displayImage() {
    const modal = await this.modalController.create({
      component: DisplayImageComponent,
      //  TODO: pass the right image
    });
    modal.present();
  }

  async shareShoppingList() {
    const modal = await this.modalController.create({
      component: ShareShoppingListComponent,
      componentProps: {
        shoppingListId: this.shoppingListId
      }
    });
    modal.present();

  }

}
