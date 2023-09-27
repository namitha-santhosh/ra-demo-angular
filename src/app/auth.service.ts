import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  authState = { isAuthenticated: false };

  private token: string | null = null;
  private isAdminUser = false;

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  login() {
    this.authState.isAuthenticated = true;
  }

  logout() {
    this.authState.isAuthenticated = false;
    this.token = null;
    this.isAdminUser = false;
  }
  
  isAuthenticatedUser(): boolean {
    return this.authState.isAuthenticated;
  }

  setAdminStatus(isAdmin: boolean) {
    this.isAdminUser = isAdmin;
  }

  isAdmin(): boolean {
    return this.isAdminUser;
  }
}
