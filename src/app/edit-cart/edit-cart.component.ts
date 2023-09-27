import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

interface Product {
  id: number;
  name: string;
}

interface Cart {
  products: Product[];
}

@Component({
  selector: 'pm-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.css']
})
export class EditCartComponent implements OnInit{
  cart: Cart = { products: [] };
  productId: number | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  fetchCart(): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make an HTTP GET request to fetch the user's cart from Symfony controller
    this.http.get<Cart>('http://127.0.0.1:8000/api/cart/view-cart', {headers}).subscribe((data) => {
      this.cart = data;
    });
  }

  addProduct(): void {
    if (this.productId) {
      const token = this.authService.getToken();

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Make an HTTP POST request to add a product to the cart
      this.http.post('http://127.0.0.1:8000/api/cart/update-cart', { action: 'add', productId: this.productId }, {headers}).subscribe(() => {
        this.fetchCart();
      });
    }
  }

  removeProduct(productId: number): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make an HTTP POST request to remove a product from the cart
    this.http.post('http://127.0.0.1:8000/api/cart/update-cart', { action: 'remove', productId }, {headers}).subscribe(() => {
      this.fetchCart();
    });
  }
}
