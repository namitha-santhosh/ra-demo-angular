
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
    if (this.signUpForm.valid) {
  
       this.http.post<any>("http://127.0.0.1:8000/api/register", this.signUpForm.value).subscribe({
              next: (response) => {
                const msg = response.message;
                alert(`${msg}`);
                this.signUpForm.reset();
                this.router.navigate(["login"]);
              },
              error: (err) => {
                if (err.status === 409) {
                  alert(`Email already registered, please login.`);
                } else {
                  alert(`Something went wrong`);
                }
              }
            });
    } else {
      alert("Please enter all the required values.");
    }
  }
  
}
