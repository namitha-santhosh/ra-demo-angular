
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://127.0.0.1:8000/api/products'; // JSON Server endpoint
  private editUrl = 'http://127.0.0.1:8000/api/products/imgedit'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProducts(): Observable<Product[]> {

    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(this.productsUrl, { headers })
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    const token = this.authService.getToken();
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(url, { headers })
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createProductWithImage(formData: FormData): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<Product>(this.productsUrl, formData, { headers }).pipe(
      tap((data: any) => {
        console.log('createProductWithImage Response:', data);
      }),
      catchError(this.handleError)
    );
  }
  
  

  deleteProduct(id: number): Observable<{}> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        tap(() => console.log('Inside updateProduct: ' + product.id)),
        map(() => product),
        catchError(this.handleError)
      );
  } 

  updateProductWithImage(productId: number, productData: FormData): Observable<Product> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`});

    const url = `${this.editUrl}/${productId}`;
    console.log('Request URL:', url);
    return this.http.post<Product>(url, productData, { headers })
      .pipe(
        tap(() => console.log('Inside updateProductwithImg: ' + productId)),
        // Return the product on an update
        map((response: Product) => response), // Cast FormData to Product for simplicity
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

   private initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      productName: '',
      productCode: '',
      tags: [''],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
      category: 0
    };
  }
}

