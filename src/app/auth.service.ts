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
  private logoutUrl: string = 'http://localhost:3000/auth/logout';

  constructor(private http: HttpClient) {
    let l = window.location;
    let host:string;
    if(l.port == '8100'){
      host = 'localhost:3000';
    }else{
      host = l.hostname + ((l.port.length>0)?':' + l.port:'');
    }
    this.url = `${l.protocol}//${host}/api/auth/`;
  }

  register (user: User): Observable<User> {
    return this.http.post<User>(this.url + 'register', user, httpOptions);
  }

  logIn(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'login', user, httpOptions);
  }

  logOut(): any {
    return this.http.get<any>(this.logoutUrl);
  }

}
