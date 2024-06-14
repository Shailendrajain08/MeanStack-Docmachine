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
    localStorage.setItem("token", token);
    this.authToken = token;
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem("token");
    this.authToken = token;
    return this.authToken;
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/authenticate/signup`, {
      user: user
    });
  }

  login (loginData:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + btoa(loginData.email + ":" + loginData.password),
      }),
    };
    return this.http.post(
      `${this.apiUrl}/authenticate/login`, 
      null,
      httpOptions
    )
  }

  verify(data:any) {
    this.loadFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.apiUrl}/otp/verify`,
      {
        data: data,
      },
      httpOptions
    );
  }

  public getUser() {
    this.loadFromLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({ Authorization: this.authToken }),
    };
    return this.http.post(
      `${this.apiUrl}/team/getUser`,
      {
        team: "team",
      },
      httpOptions
    );
  }

  public updateEmail(data:any, email:any) {
    return data;
  }
  

}
