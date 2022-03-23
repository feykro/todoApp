import { ModalController } from '@ionic/angular';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-list',
  templateUrl: './modify-list.component.html',
  styleUrls: ['./modify-list.component.scss'],
})
export class ModifyListComponent implements OnInit {

  public newName: string = '';
  private id: string;

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  modifyTodoListName() {
    if (this.newName !== '') {
      this.listService.changeName(this.id, this.newName);
    }
    this.modalController.dismiss();
    this.newName = '';
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
