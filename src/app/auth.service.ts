import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  // Simulate user login
  login() {
    this.isAuthenticated = true;
  }

  // Simulate user logout
  logout() {
    this.isAuthenticated = false;
  }

  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
