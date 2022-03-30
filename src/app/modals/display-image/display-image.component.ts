import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.scss'],
})
export class DisplayImageComponent implements OnInit {

  constructor(private listService: ListService, private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }
}