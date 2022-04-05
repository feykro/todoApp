import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public user: string;

  constructor(public auth: AngularFireAuth, private router: Router, private location: Location) { }

  ngOnInit() {
    this.user = getAuth().currentUser.email;
  }

  logout() {
    this.auth.signOut();
    this.router.navigateByUrl('');
  }

  goBack() {
    this.location.back();
  }

}
