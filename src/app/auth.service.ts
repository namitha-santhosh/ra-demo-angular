import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  //private isAuthenticated = false;
  //authState = { isAuthenticated: false };

  // Simulate user login
  login() {
    //this.authState.isAuthenticated = true;
    this.isAuthenticatedSubject.next(true);
    //console.log(this.authState.isAuthenticated)
  }

  // Simulate user logout
  logout() {
    //this.authState.isAuthenticated = false;
    this.isAuthenticatedSubject.next(false);
  }
  
  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    //return this.authState.isAuthenticated;
    return this.isAuthenticatedSubject.value;
  }
}
