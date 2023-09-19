import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

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
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.http
      .post<any>('http://localhost:8000/api/login', credentials)
      .subscribe(
        (response) => {
          // Handle the successful login response here
          const message = response.message;
          const fullName = response.fullName;
          alert(`${message}, Welcome ${fullName}`);
          this.authService.login();
          this.loginForm.reset();
          this.router.navigate(['products']);
        },
        (error) => {
          // Handle login error here
          alert('User not found or invalid password');
        }
      );
  }

  logout() {
    // Implement the logout logic if needed
  }
}

