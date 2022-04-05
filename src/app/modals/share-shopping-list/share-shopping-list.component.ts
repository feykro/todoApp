import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-share-shopping-list',
  templateUrl: './share-shopping-list.component.html',
  styleUrls: ['./share-shopping-list.component.scss'],
})
export class ShareShoppingListComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService, private modalController: ModalController) { }

  recipient: string;
  recipientCanRead: boolean = true;
  recipientCanWrite: boolean = false;

  @Input() shoppingListId: string;

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  shareShoppingList() {
    this.shoppingListService.modifyShoppingListShares(this.shoppingListId, this.recipient, this.recipientCanRead, this.recipientCanWrite);
    this.dismissModal();
  }

}
