import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  email: string = "";
  password: string = "";

  hasError: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, public auth: AngularFireAuth, private location: Location) { }

  ngOnInit() {
  }

  register() {
    console.log("register start");

    console.log("register email = " + this.email);
    console.log("register password = " + this.password);


    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log("register OK, userCredential = " + userCredential);
        userCredential.user.sendEmailVerification();
        this.auth.signOut();
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        const errorCode = error.code;
        this.errorMessage = error.message;
        console.log("register KO, errorCode = " + errorCode + ", errorMessage = " + this.errorMessage);

        this.hasError = true;
      });

    console.log("register end");
  }

  goBack() {
    this.location.back();
  }

}
