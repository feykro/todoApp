import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.scss'],
})
export class DisplayImageComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismissModal() {
    this.modalController.dismiss();
  }
}