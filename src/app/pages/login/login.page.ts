import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';
import { LoginLostpasswordComponent } from 'src/app/modals/login-lostpassword/login-lostpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";
  message: string = "";

  constructor(private router: Router,
    public auth: AngularFireAuth,
    public modalController: ModalController) { }


  ngOnInit() { }

  login() {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(_ => this.router.navigateByUrl('/home'))
      .catch(error => this.message = error.message);

    console.log("login end");
  }

  async lostPassword() {
    const modal = await this.modalController.create({
      component: LoginLostpasswordComponent
    });
    modal.present();
  }

}
