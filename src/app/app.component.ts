import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'pm-root',
  template: ` <app-navbar></app-navbar>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  
    <!-- <nav class='navbar navbar-expand navbar-light bg-light'>
      <a style="font-weight:bold;" class='navbar-brand'>{{pageTitle}}</a>
      <ul class='navbar-nav'>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active'
              [routerLink]="['/welcome']">Home</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/login']">Login</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
              [routerLink]="['/signUp']">Register</a>
        </li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div> -->
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Tech & Mech';
}
 


 
