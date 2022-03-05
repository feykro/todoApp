import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("ngOnInit start");
  }

  login() {
    console.log("login start");
    console.log("login TODO effective login");
    console.log("login redirect to /home");

    this.router.navigateByUrl('/home');
    console.log("login end");
  }

}
