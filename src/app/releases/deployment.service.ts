
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Release } from './release';
import { Deployment } from './deployment';

@Injectable({
  providedIn: 'root'
})
export class DeploymentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  triggerDeployment(releaseName: string, params: any): Observable<any> {
    return this.http.post('/api/deploy', {
      ...params,
      releaseName: releaseName
    });
  }

  getDeployments(limit: number = 10): Observable<{ deployments: Deployment[] }> {
    return this.http.get<{ deployments: Deployment[] }>(`/api/deployments?limit=${limit}`);
  }

  createDeployment(releaseName:string, params:any): Observable<any> {
    const token = this.authService.getToken();
    const url = `/api/deploy`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json');
    
    return this.http.post<any>(url, {
      ...params,
      releaseName: releaseName
    }, { headers })
    .pipe(
      tap(data => console.log('createDeployment: ' + JSON.stringify(data))),
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

