import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url: string;

  constructor(private http: HttpClient) {
    let l = window.location;
    this.url = `${l.protocol}://${l.hostname}/api/auth/`;
  }

  register (user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user, httpOptions);
  }

  logIn(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'login', user, httpOptions);
  }

  logOut(user: User) {
    return this.http.get<User>(this.url + 'logout')
  }

}
