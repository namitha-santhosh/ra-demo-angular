
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})


export class SignupPageComponent {
  public signUpForm!: FormGroup;
  public loading = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullname: ["", Validators.required],
      contact: ["", Validators.minLength(10)],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  signUp() {
    this.loading = true;
    if (this.signUpForm.valid) {
  
       this.http.post<any>("/api/register", this.signUpForm.value).subscribe({
              next: (response) => {
                const msg = response.message;
                alert(`${msg}`);
                this.signUpForm.reset();
                this.router.navigate(["login"]);
                this.loading = false;
              },
              error: (err) => {
                if (err.status === 409) {
                  alert(`Email already registered, please login.`);
                } else {
                  alert(`Something went wrong`);
                }
                this.loading = false;
              }
            });
    } else {
      alert("Please enter all the required values.");
    }
  }
  
}
