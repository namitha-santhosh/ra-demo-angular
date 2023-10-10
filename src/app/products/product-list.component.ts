import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];


  constructor(private productService: ProductService, private router: Router, private http:HttpClient, private authService: AuthService) { }

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
  

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  performFilter2(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        (product.tags && product.tags.some(tag => tag.toLocaleLowerCase().indexOf(filterBy) !== -1)));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }


  currentPage = 1;
  pageSize = 10;
  totalItems = 0;


  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.productService.getProducts(page, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.products = response.data;
          this.totalItems = response.totalItems;
          this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
        },
        error: err => this.errorMessage = err
      });
  }

  pageChanged(page: number): void {
    this.currentPage = page;
    this.loadPage(this.currentPage);
  }

  isAdminUser(): boolean {
    return this.authService.isAdmin();
  }
  
}
