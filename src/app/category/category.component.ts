import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: any[] = []; 
  selectedCategoryId: number | null = null;
  selectedCategoryName: string = ''; 
  products: any[] = []; 
  showImage = true;
  imageWidth = 50;
  imageMargin = 2;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    this.http.get('http://127.0.0.1:8000/api/category', { headers }).subscribe((data: any) => {
      this.categories = data;
    });
  }

  onCategoryChange(): void {
    if (this.selectedCategoryId !== null) {
      const categoryId = +this.selectedCategoryId; 
      const apiUrl = `http://127.0.0.1:8000/api/category/${categoryId}`;
      const token = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  

      this.http.get(apiUrl, { headers }).subscribe((data: any) => {
        this.products = data;
      });

      const selectedCategory = this.categories.find(category => category.id === categoryId);
      this.selectedCategoryName = selectedCategory ? selectedCategory.name : '';
    } else {
      this.products = [];
      this.selectedCategoryName = '';
    }
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
}
