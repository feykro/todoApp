import { ModalController } from '@ionic/angular';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})

export class CreateListComponent implements OnInit {

  public newTodoListName : string = '';

  constructor(private listService : ListService, private modalController : ModalController) { }

  ngOnInit() {}

  addTodoList(){
    if(this.newTodoListName === ''){
      this.newTodoListName = 'default';
    }
    this.listService.createTodoList(this.newTodoListName);
    this.dismissModal();
    this.newTodoListName = '';
  }

  dismissModal(){
    this.modalController.dismiss();
  }

}
