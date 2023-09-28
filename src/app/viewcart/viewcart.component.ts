import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-view-cart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewCartComponent implements OnInit {
  username: string | undefined;
  products: Product[] = [];

  constructor(private http: HttpClient, private authService:AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCartData();
  }

  fetchCartData() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://127.0.0.1:8000/api/cart/view-cart', { headers }).subscribe(data => {
      this.username = data.username;
      this.products = data.products;
    });
  }


  removeProduct(productId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.post<any>(`http://127.0.0.1:8000/api/cart/remove-product/${productId}`, {}, { headers }).subscribe(
      () => {
        alert('Product removed from cart.');
        this.fetchCartData();
      },
      (error) => {
        console.error('Error removing product:', error);
        alert("Something went wrong");
      }
    );
  }
  
  
  fetchImage(imageUrl: string): void {
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe(response => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageElement = document.getElementById('productImage') as HTMLImageElement;
        imageElement.src = reader.result as string;
      };
      reader.readAsDataURL(response);
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
  
}

