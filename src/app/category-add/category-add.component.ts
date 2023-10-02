import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../category.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  newCategory: Category = {
    id: 0,
    name: ''
  };

  @ViewChild('categoryForm') categoryForm!: NgForm; 

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  addCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const apiUrl = 'http://127.0.0.1:8000/api/add-category';
    this.http.post(apiUrl, this.newCategory, { headers }).subscribe(
      (response: any) => {
        console.log('Category added:', response);
        this.router.navigate(['/products']);
      },
      (error: any) => {
        console.error('Error adding category:', error);
      }
    );
  }
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
