
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Release } from './release';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  private releasesUrl = 'http://127.0.0.1:8000/api/releases'; 
  private releaseUrl = 'http://127.0.0.1:8000/api/release';

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
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getReleaseByName(name: string): Observable<Release> {
    const token = this.authService.getToken();
    if (name === '') {
      return of(this.initializeProduct());
    }
    const url = `${this.releaseUrl}/${name}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Release>(url, { headers })
      .pipe(
        tap(data => console.log('getRelease: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createRelease(release: Release): Observable<Release> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Release>(this.releaseUrl, release, { headers }).pipe(
      tap((data: any) => {
        console.log('createRelease Response:', data);
      }),
      catchError(this.handleError)
    );
  }

  deleteRelease(name: string): Observable<{}> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const url = `${this.releaseUrl}/${name}`;
    return this.http.delete<Release>(url, { headers })
      .pipe(
        tap(data => console.log('deleteRelease: ' + name)),
        catchError(this.handleError)
      );
  }

  updateRelease(release: Release): Observable<Release> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const url = `${this.releaseUrl}/${release.name}`;
    return this.http.put<Release>(url, release, { headers })
      .pipe(
        tap(() => console.log('Inside updateProduct: ' + release.name)),
        map(() => release),
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

   private initializeProduct(): Release {
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

