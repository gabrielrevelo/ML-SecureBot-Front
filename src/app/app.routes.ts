import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { AlertFormComponent } from './components/alert-form/alert-form.component';
import { QrLoginComponent } from './components/qr-login/qr-login.component';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'whatsapp',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AppComponent
  },
  {
    path: 'whatsapp',
    component: QrLoginComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()]
  },
  {
    path: 'contacts',
    component: ContactsListComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()]
  },
  {
    path: 'alert',
    component: AlertFormComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()]
  }
];
