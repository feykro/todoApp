import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  email : string = "";
  password : string = "";

  hasError : boolean = false;
  errorMessage : string = "";

  constructor(private router: Router, public auth: AngularFireAuth) { }

  ngOnInit() {
  }
  
  register() {
    console.log("register start");

    console.log("register email = " + this.email);
    console.log("register password = " + this.password);

    
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        console.log("register OK, userCredential = " + userCredential);
        this.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          console.log("register login OK, userCredential = " + userCredential + ", redirect to /home");
          this.router.navigateByUrl('/home');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("register login KO, errorCode = " + errorCode + ", errorMessage = " + errorMessage);
          // TODO forward error message to login page
          this.router.navigateByUrl('');
        });
        
    })
    .catch((error) => {
      const errorCode = error.code;
      this.errorMessage = error.message;
      console.log("register KO, errorCode = " + errorCode + ", errorMessage = " + this.errorMessage);

      this.hasError = true;
    });

    console.log("register end");
  }

}
