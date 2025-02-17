
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
export class ReleaseService {
  private releasesUrl = '/api/releases'; 
  private releaseUrl = '/api/release';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllReleases(page: number, pageSize: number): Observable<Release[]> {

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    const urlWithParams = `${this.releasesUrl}?${params.toString()}`;
      
    return this.http.get<Release[]>(urlWithParams, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getReleaseByName(name: string): Observable<Release> {
    const token = this.authService.getToken();
    if (name === '') {
      return of(this.initializeRelease());
    }
    const url = `${this.releaseUrl}/${name}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Release>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  createRelease(release: Release): Observable<Release> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Release>(this.releaseUrl, release, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteRelease(name: string): Observable<{}> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const url = `${this.releaseUrl}/${name}`;
    return this.http.delete<Release>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateRelease(release: Release): Observable<Release> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const url = `${this.releaseUrl}/${release.name}`;
    return this.http.put<Release>(url, release, { headers })
      .pipe(
        map(() => release),
        catchError(this.handleError)
      );
  }

  getReleaseArtifacts(releaseName: string): Observable<any[]> {
    const token = this.authService.getToken();
    const url = `${this.releasesUrl}/${releaseName}/artifacts`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getReleaseDeployments(releaseName: string): Observable<{ releaseName: string, deployments: Deployment[] }> {
    const token = this.authService.getToken();
    const url = `${this.releasesUrl}/${releaseName}/deployments`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<{ releaseName: string, deployments: Deployment[] }>(
      `${this.releasesUrl}/${releaseName}/deployments`, { headers }
    )
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteArtifactFromRelease(releaseName: string, artifactName: string): Observable<{}> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const url = `${this.releasesUrl}/${releaseName}/artifacts/${artifactName}`;
    
    return this.http.delete(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  patchArtifact(releaseName: string, artifactName: string, updateData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const url = `${this.releasesUrl}/${releaseName}/artifacts/${artifactName}`;
    
    return this.http.patch<any>(url, updateData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  } 
  
  getSignoffs(releaseName: string): Observable<any[]> {
    const token = this.authService.getToken();
    const url = `${this.releasesUrl}/${releaseName}/signoffs`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any[]>(url, { headers })
      .pipe(
        tap(data => console.log('getSignoffs:', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  createOrUpdateSignoff(releaseName: string, signoffData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
  
    return this.http.post<any>(`${this.releasesUrl}/${releaseName}/signoffs`, signoffData, { headers })
      .pipe(
        tap((data) => console.log('createOrUpdateSignoff:', data)),
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

   private initializeRelease(): Release {
    // Return an initialized object
    return {
        name: '',
        status: '',
        productionDate: new Date(),
        qaDate: new Date(),
        stageDate: new Date(),
        mainReleaseTicket: ''
    };
  }
}

