import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  errors: Array<any> = [];
  errorMessage: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.logOut();
  }

  response(response): void {
    if(response.success===false) {
      this.errors = response.error.errors;
      this.errorMessage = response.error;
    }

    if(response.success===true) {
      this.router.navigate(['/']);
    }
  }

  logOut(): void {
    this.authService.logOut().subscribe(
      (response) => {
        this.response(response)
        console.log(response)
      }
    );
  }

}
