import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticatedUser() && this.authService.isAdmin()) {
      // User is authenticated and is an admin, allow access
      return true;
    } else {
      // User is not authenticated or is not an admin, redirect to a login page or show an error
      this.router.navigate(['/login']); // Change this to the appropriate route
      return false;
    }
  }
}
