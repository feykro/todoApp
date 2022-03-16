import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    public modalController: ModalController) { }


  ngOnInit() {
    console.log("ngOnInit start");
  }

  login() {
    console.log("login start");

    console.log("login email = " + this.email);
    console.log("login password = " + this.password);


    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log("login OK, userCredential = " + userCredential + ", redirect to /home");
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("login KO, errorCode = " + errorCode + ", errorMessage = " + errorMessage);

        this.message = error.message;
      });

    console.log("login end");
  }

  async lostPassword() {
    const modal = await this.modalController.create({
      component: LoginLostpasswordComponent,
    });
    modal.present();
  }

}
