import { ModalController } from '@ionic/angular';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-list',
  templateUrl: './modify-list.component.html',
  styleUrls: ['./modify-list.component.scss'],
})
export class ModifyListComponent implements OnInit {

  public newName : string = '';
  ind : number;

  constructor(private listService : ListService, private modalController : ModalController) { }

  ngOnInit() {}

  modifyTodoListName(indice : number){
    if(this.newName != ''){
      this.listService.changeName(indice, this.newName);
    }
    this.modalController.dismiss();
    this.newName = '';
  }

  dismissModal(){
    this.modalController.dismiss();
  }

}
