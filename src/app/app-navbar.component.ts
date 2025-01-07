import { Component } from '@angular/core';
import { AuthService } from './auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  pageTitle = 'P10-RA DEMO';
  isAuthenticated = false;
  sidebarCollapsed = true; // Initialize the sidebar as collapsed

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.authState.isAuthenticated;
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    console.log('Sidebar toggled:', this.sidebarCollapsed); // Debugging output
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
