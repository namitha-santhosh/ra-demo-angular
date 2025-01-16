import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;  // Spinner loading state

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
  
    this.http
      .post<any>('http://localhost:8000/api/login', credentials)
      .subscribe(
        (response) => {
          const jwtToken = response.token; 
  
          const jwtHelper = new JwtHelperService();
          const tokenPayload = jwtHelper.decodeToken(jwtToken);
  
          this.authService.setToken(jwtToken);
          this.authService.login();
  
          const isAdmin = tokenPayload.roles.includes('ROLE_ADMIN');
          const isRA = tokenPayload.roles.includes('ROLE_RA');
          
          this.authService.setAdminStatus(isAdmin);
          this.authService.setRAStatus(isRA);
          
          this.loginForm.reset();
          this.router.navigate(['welcome']);
          
          this.loading = false;
        },
        (error) => {
          alert('User not found or invalid password');
          
          this.loading = false;
        }
      );
  }

  logout() {}
}
