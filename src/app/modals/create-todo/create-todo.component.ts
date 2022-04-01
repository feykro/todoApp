import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingListService } from 'src/app/services/list.service';
import { ItemToShop } from 'src/app/models/item-to-shop';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})

export class CreateTodoComponent implements OnInit {

  @Input() shoppingListId: string;
  itemToShop: ItemToShop = {
    name: '',
    description: '',
    isDone: false,
    quantity: 1
  };

  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  createItemToShop() {
    this.shoppingListService.createItemToShop(this.shoppingListId, this.itemToShop);
    this.dismissModal();
  }
}
