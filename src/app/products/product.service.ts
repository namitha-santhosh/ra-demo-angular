
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://127.0.0.1:8000/api/products'; // JSON Server endpoint
  private editUrl = 'http://127.0.0.1:8000/products/api/imgedit'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createProductWithImage(formData: FormData): Observable<Product> {
    // Create headers with the content type for multipart/form-data
    const headers = new HttpHeaders({
      // No need to set 'Content-Type' here; it will be set automatically for FormData
      // Other headers, if needed, can be added here
    });
  
    return this.http.post<Product>(this.productsUrl, formData, { headers }).pipe(
      tap((data: any) => {
        console.log('createProductWithImage Response:', data);
      }),
      catchError(this.handleError)
    );
  }
  
  

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  } 

  updateProductWithImage(productId: number, productData: FormData): Observable<Product> {
    const url = `${this.editUrl}/${productId}`;
    return this.http.put<Product>(url, productData)
      .pipe(
        tap(() => console.log('updateProduct: ' + productId)),
        // Return the product on an update
        map(() => productData as unknown as Product), // Cast FormData to Product for simplicity
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
      imageUrl: ''
    };
  }
}

