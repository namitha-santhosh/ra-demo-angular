import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import { AuthService } from '../auth.service';
import { CartService } from './CartService';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: Product | undefined;
  quantity: number = 1; 
  isAuthenticated = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private authService: AuthService,
              private cartService: CartService
              ) {
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }



  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  isAdminUser(): boolean {
    return this.authService.isAdmin();
  }

  /* addToCart(productId: number): void {
    if (productId !== null) { 
      this.cartService.addToCart(productId).subscribe(
        (response: any) => {
          console.log('Product added to cart:', response);
          alert("Product added to cart");
          this.router.navigate(['/products']);
        },
        (error: any) => {
          console.error('Error adding product to cart:', error);
        }
      );
    }
  } */

  addToCart(productId: number, quantity: number): void {
    if (productId !== null) {
      this.cartService.addToCart(productId, quantity).subscribe(
        (response: any) => {
          console.log('Product added to cart:', response);
          console.log('Quantity:', this.quantity);
          alert('Product added to cart');
          this.router.navigate(['/products']);
        },
        (error: any) => {
          console.error('Error adding product to cart:', error);
        }
      );
    }
  }

}
