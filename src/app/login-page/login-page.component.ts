import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  public loginForm!: FormGroup;
  private subscription: Subscription = new Subscription();


  constructor(private formbuilder: FormBuilder,
              private http: HttpClient, 
              private router: Router, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }
  
 
  login() {
    console.log(this.loginForm.value)
    this.subscription.add(
    this.http.get<any>("http://localhost:3000/signupUsersList")
      .subscribe({
        next: (res) => {
          const user = res.find((a: any) => {
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
          });
          if (user) {
            const fname = user.fname;
            alert(`Welcome, ${fname}`);
            this.authService.login();
            this.loginForm.reset();
            this.router.navigate(["products"]);
          } else {
            alert("User not found");
          }
        },
        error: (err) => {
          alert("Something went wrong");
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
  
}
