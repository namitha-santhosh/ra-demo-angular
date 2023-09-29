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
    this.http.get<Cart>('http://127.0.0.1:8000/api/cart/view-cart', {headers}).subscribe((data) => {
      this.cart = data;
    });
  }


  removeProduct(productId: number): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://127.0.0.1:8000/api/cart/update-cart', { action: 'remove', productId }, {headers}).subscribe(() => {
      this.fetchCart();
    });
  }
}
