import { NgModule } from '@angular/core';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { emailVerified } from '@angular/fire/auth-guard'
import { hasCustomClaim } from '@angular/fire/compat/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

// cf https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md
const adminOnly = () => hasCustomClaim('admin');

const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectUnauthorizedToLogin = () => redirectUnverifiedTo(['']);

const redirectVerifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified ? redirect : true));
const redirectLoggedInAndVerifiedToHome = () => redirectVerifiedTo(['home']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'list-details',
    loadChildren: () => import('./pages/list-details/list-details.module').then(m => m.ListDetailsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInAndVerifiedToHome)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInAndVerifiedToHome) // logged user has no reason to register a new account
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
