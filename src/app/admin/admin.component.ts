import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'pm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  iframeUrl: SafeResourceUrl | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    const adminUrl = 'http://127.0.0.1:8000/admin'; 

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(adminUrl, { headers }).subscribe(
      (response: any) => {
      },
      (error) => {
        console.error('Error fetching admin data', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
