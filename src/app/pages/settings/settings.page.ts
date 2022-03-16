import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, public auth: AngularFireAuth) { }

  ngOnInit() {
    console.log("ngOnInit start");
  }

  logout() {
    console.log("logout start");

    this.auth.signOut();

    this.router.navigateByUrl('');
    console.log("logout end");
  }

}
