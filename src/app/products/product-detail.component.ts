import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from './product';
import { ProductService } from './product.service';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  errorMessage = '';
  product: Product | undefined;

  isAuthenticated = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private authService: AuthService) {
  }



  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.isAuthenticated = this.authService.isAuthenticatedUser();
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
