import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';
import { User } from '../users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  user:User = new User();
  errors: Array<any> = [];
  errorMessage: string;
  confirm_password: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  response(response): void {
    if(response.success===false) {
      this.errors = response.error.errors;
      this.errorMessage = response.error.message;
    }

    if(response.success===true) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.user.password != null && this.user.password === this.confirm_password) {
      this.authService.register(this.user).subscribe(
        (response) => {
          this.response(response)
          console.log(response)
        }
      );
    } else {
      console.log('Your and idiot');
      console.log(this.user);
    }
    
  }

}
