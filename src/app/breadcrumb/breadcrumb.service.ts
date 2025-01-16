import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs: Array<{ label: string, url: string }> = [];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.router.routerState.snapshot.root);
    });
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    if (route) {
      const routeURL: string = route.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
  
      if (route.data['breadcrumb']) {
        breadcrumbs.push({ label: route.data['breadcrumb'], url });
      }
  
      route.children.forEach(child => {
        this.createBreadcrumbs(child, url, breadcrumbs);
      });
    }
  
    return breadcrumbs; 
  }  
}
