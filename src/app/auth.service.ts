import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authState = { isAuthenticated: false };

  private token: string | null = null;
  private isAdminUser = false;
  private isAdmin = false;
  private isRA = false;

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
    this.isAdmin = isAdmin;
  }

  setRAStatus(isRA: boolean) {
    this.isRA = isRA;
  }

  hasRole(role: string): boolean {
    if (role === 'ROLE_ADMIN') {
      return this.isAdmin;
    }
    if (role === 'ROLE_RA') {
      return this.isRA;
    }
    return false;
  }
}
