
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
      fname: ["", Validators.required],
      phone: ["", Validators.minLength(10)],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
  
      // Check if the email already exists before submitting the form
      this.http.get<any>("http://localhost:3000/signupUsersList").subscribe({
        next: (users) => {
          // Check if the email already exists in the list of users
          const emailExists = users.some((user: { email: any; }) => user.email === this.signUpForm.value.email);
          if (emailExists) {
            alert("An account with this email id already exits. Please login.");
          } else {
            // Email doesn't exist, proceed with sign up
            this.http.post<any>("http://localhost:3000/signupUsersList", this.signUpForm.value).subscribe({
              next: (res) => {
                alert('Sign Up Successful');
                this.signUpForm.reset();
                this.router.navigate(["login"]);
              },
              error: (err) => {
                alert("Something went wrong");
              }
            });
          }
        },
        error: (err) => {
          alert("Something went wrong while checking email availability.");
        }
      });
    } else {
      alert("Please enter all the required values.");
    }
  }
  
}
