import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  authState = { isAuthenticated: false };
  private jwtHelper = new JwtHelperService();

  private token: string | null = null;
  private isAdminUser = false;
  private isAdmin = false;
  private isRA = false;
  private isQA = false;

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): string | null {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken?.username || null;
    }
    return null;
  }

  getUserRoles(): string[] {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken?.roles || [];
    }
    return [];
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

  setQAStatus(isQA: boolean) {
    this.isQA = isQA;
  }

  hasRole(role: string): boolean {
    if (this.isAdmin) {
      return true;
    }
    switch (role) {
      case 'ROLE_RA':
        return this.isRA;
      case 'ROLE_QA':
        return this.isQA;
      default:
        return false;
    }
  }  
}
