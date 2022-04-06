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
  recipientCanWrite: boolean = false;
  readOnly: boolean = true;

  @Input() shoppingListId: string;

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }

  switchToReadOnly() {
    if (!this.readOnly) this.recipientCanWrite = false;
    else this.recipientCanWrite = true;
  }

  switchToWrite() {
    if (!this.recipientCanWrite) this.readOnly = false;
    else this.readOnly = true;
  }

  shareShoppingList() {
    this.shoppingListService.modifyShoppingListShares(this.shoppingListId, this.recipient, true, this.recipientCanWrite);
    this.dismissModal();
  }

}
