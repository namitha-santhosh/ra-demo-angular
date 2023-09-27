import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-view-cart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewCartComponent implements OnInit {
  username: string | undefined;
  products: Product[] = [];

  constructor(private http: HttpClient, private authService:AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Fetch cart data from Symfony controller
    this.http.get<any>('http://127.0.0.1:8000/api/cart/view-cart', {headers}).subscribe(data => {
      this.username = data.username;
      this.products = data.products;
    });
  }
}

