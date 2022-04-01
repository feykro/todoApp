import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemToShop } from 'src/app/models/item-to-shop';
import { ShoppingListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-modify-todo',
  templateUrl: './modify-todo.component.html',
  styleUrls: ['./modify-todo.component.scss'],
})
export class ModifyTodoComponent implements OnInit {
  @Input() shoppingListId: string;
  @Input() itemToShop: ItemToShop;

  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  modifyItemToShop() {
    this.shoppingListService.modifyItemToShop(this.shoppingListId, this.itemToShop);
    this.dismissModal();
  }

}
