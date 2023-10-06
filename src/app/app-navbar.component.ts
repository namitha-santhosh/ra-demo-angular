import { Component } from '@angular/core';
import { AuthService } from './auth.service'; // Import AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a style="font-weight: bold;" class="navbar-brand">{{ pageTitle }}</a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/welcome']">Home</a>
      </li>
      <li class="nav-item" *ngIf="!authService.isAuthenticatedUser()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/login']">Login</a>
      </li>
      <li class="nav-item" *ngIf="!authService.isAuthenticatedUser()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/signUp']">SignUp</a>
      </li>
      <li class="nav-item" *ngIf="authService.isAuthenticatedUser()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/products']">Products</a>
      </li>
      <li class="nav-item" *ngIf="authService.isAdmin()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/products/0/edit']">Add Product</a>
      </li>
      <li class="nav-item" *ngIf="authService.isAdmin()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/view category']">Edit Category</a>
      </li>
      <li class="nav-item" *ngIf="authService.isAdmin()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/admin']">View Dashboard</a>
      </li>
      <li class="nav-item" *ngIf="authService.isAuthenticatedUser() && !authService.isAdmin()">
        <a class="nav-link" routerLinkActive="active" [routerLink]="['/cart']">View Cart</a>
      </li>
      <li class="nav-item" *ngIf="authService.isAuthenticatedUser()">
        <a style="color: red;" class="nav-link" (click)="logout()" [ngClass]="{ 'hand-cursor': true }">Logout</a>
      </li>
    </ul>
  </div>
</nav>

  `,
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  pageTitle = 'Tech & Mech';
  isAuthenticated = false;
  // app-navbar.component.ts

  

  constructor(public authService: AuthService,private router:Router) {}



   ngOnInit() {
    console.log('AppNavbarComponent initialized');
    // Check if the user is authenticated when the component loads
    this.isAuthenticated = this.authService.authState.isAuthenticated;
    console.log(this.isAuthenticated);
  } 



  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
    // Update the isAuthenticated status to false
    this.isAuthenticated = false;
    this.router.navigate( ['/login'])
  } 
}
