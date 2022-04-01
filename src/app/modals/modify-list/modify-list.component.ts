import { ModalController } from '@ionic/angular';
import { ShoppingListService } from './../../services/list.service';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/models/shopping-list';

@Component({
  selector: 'app-modify-list',
  templateUrl: './modify-list.component.html',
  styleUrls: ['./modify-list.component.scss'],
})
export class ModifyListComponent implements OnInit {

  @Input() shoppingList: ShoppingList;

  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  ngOnInit() { }

  modifyShoppingList() {
    this.shoppingListService.modifyShoppingList(this.shoppingList);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
