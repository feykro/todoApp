import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-lostpassword',
  templateUrl: './login-lostpassword.component.html',
  styleUrls: ['./login-lostpassword.component.scss'],
})
export class LoginLostpasswordComponent implements OnInit {

  public lostEmail: string = '';

  constructor(public auth: AngularFireAuth, private modalController: ModalController) { }

  ngOnInit() { }

  sendPasswordResetEmail() {
    console.log("LoginLostpasswordComponent sendPasswordResetEmail called", this.lostEmail);
    if (this.isValidEmail(this.lostEmail)) {
      this.auth.sendPasswordResetEmail(this.lostEmail);
      this.modalController.dismiss();
    } else {
      console.log("LoginLostpasswordComponent sendPasswordResetEmail entry is not a valid email", this.lostEmail);
      // TODO afficher l'erreur dans la modale
    }

  }

  isValidEmail(email: string) {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }

}
