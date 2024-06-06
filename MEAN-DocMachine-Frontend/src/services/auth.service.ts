import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `http://localhost:3000/api`;
  public role: any;
  public authToken:any;
  public name: any;
  public loginData = new BehaviorSubject({});

  constructor(private http : HttpClient) { }

  public addLoginData (data: {}) {
    this.loginData.next(data)
  }

  public addToken(token: string) {
    console.log(token);
    localStorage.setItem("token", token);
    this.authToken = token;
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem("token");
    this.authToken = token;
    return this.authToken;
  }

  register(user: any) {
    console.log(user)
    return this.http.post(`${this.apiUrl}/authenticate/signup`, {
      user: user
    });
  }
}
