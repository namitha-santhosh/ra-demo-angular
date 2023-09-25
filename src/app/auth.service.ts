import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private isAuthenticated = false;
  authState = { isAuthenticated: false };

  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  // Simulate user login
  login() {
    this.authState.isAuthenticated = true;
    //console.log(this.authState.isAuthenticated)
  }

  // Simulate user logout
  logout() {
    this.authState.isAuthenticated = false;
    this.token = null;
  }
  
  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.authState.isAuthenticated;
    return !!this.token;
  }
}
