import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://127.0.0.1:8000/api/cart/add-product'; // Replace with your Symfony API endpoint URL

  constructor(private http: HttpClient, private authService: AuthService) {}


  addToCart(productId: number): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrlWithProductId = `http://127.0.0.1:8000/api/cart/add-product/${productId}`;
    // Send a POST request to add the product to the cart
    return this.http.post(apiUrlWithProductId, {}, { headers });
  }
}
