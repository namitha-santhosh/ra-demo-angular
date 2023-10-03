import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../products/CartService';

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
}

@Component({
  selector: 'app-view-cart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewCartComponent implements OnInit {
  username: string | undefined;
  //products: Product[] = [];
  cartItems: CartItem[] = [];

  constructor(private http: HttpClient, private authService:AuthService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCartData();
  }


  fetchCartData() {
    this.cartService.fetchCartData().subscribe((data: { username: string | undefined; cartItems: CartItem[]; }) => {
      this.username = data.username;
      //this.products = data.products;
      this.cartItems = data.cartItems;
    });
  }


  removeProduct(productId: number) {
  
    this.cartService.removeProduct(productId).subscribe(
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

