
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { Artifact } from './artifact';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {
  private artifactsUrl = 'http://127.0.0.1:8000/api/artifacts'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllArtifacts(page: number, pageSize: number): Observable<Artifact[]> {
  
      const token = this.authService.getToken();
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
  
      const urlWithParams = `${this.artifactsUrl}?${params.toString()}`;
        
      return this.http.get<Artifact[]>(urlWithParams, { headers })
        .pipe(
          tap(data => console.log(JSON.stringify(data))),
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

