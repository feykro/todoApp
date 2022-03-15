import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user : any = null;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router
  ){ 
    console.log('AuthGuard constructor called');
    // this.angularFireAuth.user.subscribe(user => {
    //   console.log('AuthGuard user changed', user);
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     this.user = null;
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("AuthGuard can activate start");
    if (this.user === null) {
      this.router.navigateByUrl('');
    } else {
      if (this.user.emailVerified) {
        this.router.navigateByUrl('/home');
      } else {
        console.log('Merci de valider votre email');
        this.router.navigateByUrl('');
      }
    }
    return true;
  }

}
