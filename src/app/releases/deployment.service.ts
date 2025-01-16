
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Release } from './release';

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {
  private releasesUrl = 'http://127.0.0.1:8000/api/releases'; 
  private deploymentsUrl = 'http://127.0.0.1:8000/api/deployments'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  createDeployment(releaseName: string): Observable<Release> {
    const token = this.authService.getToken();
    const url = `${this.releasesUrl}/${releaseName}/artifacts`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Release>(url, { headers }).pipe(
      tap((data: any) => {
        console.log('createDeployment Response:', data);
      }),
      catchError(this.handleError)
    );
  }

  deleteDeployment(slug: string): Observable<{}> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const url = `${this.deploymentsUrl}/${slug}`;
    return this.http.delete<Release>(url, { headers })
      .pipe(
        tap(data => console.log('deleteDeployment: ' + name)),
        catchError(this.handleError)
      );
  }
    
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}

