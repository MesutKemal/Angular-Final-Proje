import { ProfilComponent } from './component/profil/profil.component';
import { UrunComponent } from './component/urun/urun.component';
import { Kategori_yeniComponent } from './component/kategori_yeni/kategori_yeni.component';

import { LoginComponent } from './component/login/login.component';
import { UyeComponent } from './component/uye/uye.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { Urun } from './models/Urun';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';



const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'uyeler',
    component: UyeComponent,
    ...canActivate(redirectToLogin),
  },


  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'kategoriler',
    component: Kategori_yeniComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'urunler',
    component: UrunComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'profil',
    component: ProfilComponent,
    ...canActivate(redirectToLogin),
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
