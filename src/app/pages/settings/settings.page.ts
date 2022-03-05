import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("ngOnInit start");
  }

  logout() {
    console.log("logout start");
    console.log("logout TODO effective logout");

    this.router.navigateByUrl('');
    console.log("logout end");
  }

}
