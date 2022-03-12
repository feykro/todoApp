import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-lostpassword',
  templateUrl: './login-lostpassword.component.html',
  styleUrls: ['./login-lostpassword.component.scss'],
})
export class LoginLostpasswordComponent implements OnInit {

  public lostEmail : string = '';
  
  constructor(public auth: AngularFireAuth, private modalController : ModalController) { }

  ngOnInit() {}


  sendPasswordResetEmail() {
    console.log("LoginLostpasswordComponent sendPasswordResetEmail called", this.lostEmail);
    if (this.lostEmail === '') { // TODO tester avec une regex que l'email est valide
      console.log("LoginLostpasswordComponent sendPasswordResetEmail entry is not a valid email", this.lostEmail);
      // TODO afficher l'erreur dans la modale
    } else {
      this.auth.sendPasswordResetEmail(this.lostEmail);
      this.modalController.dismiss();
    }

  }

}
