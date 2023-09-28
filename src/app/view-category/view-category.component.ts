import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent {
  categories: any[] = []; 

  constructor(private http:HttpClient, private authService:AuthService, private router:Router){}
  
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>('http://127.0.0.1:8000/api/category', {headers}).subscribe((data: any) => {
      this.categories = data;
    });
  }

  deleteCategory(categoryId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<void>(`http://127.0.0.1:8000/api/delete-category/${categoryId}`, {headers} ).subscribe(() => {
      // After successful deletion, reload the categories
      alert("Category Deleted Successfully")
      this.loadCategories();

    });
  }

  onBack():void{
    this.router.navigate(['/products']);
  }



}
