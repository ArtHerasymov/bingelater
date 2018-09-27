import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { AuthenticationService } from './services/authentication.service'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard'

const appRoutes: Routes = [
  { path: '' , component: LoginComponent},
  { path: 'dashboard' , component: DashboardComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
