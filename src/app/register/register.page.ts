import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(public auth: AngularFireAuth, private router: Router, private location: Location) { }

  ngOnInit() { }

  register() {

    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
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
  }

  goBack() {
    this.location.back();
  }

}
