import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../users';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  errors: Array<any> = [];
  errorMessage: string;

  constructor( 
    private authService: AuthService, 
    private router: Router
  ) {  }

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
    this.authService.logIn(this.user).subscribe(
      (response) => {
        this.response(response)
        console.log(response)
      }
    );
  }

}
