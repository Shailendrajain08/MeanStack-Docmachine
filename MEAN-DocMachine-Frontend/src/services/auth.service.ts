import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from "jwt-decode"


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = `http://localhost:8906/api`;
  public role: any;
  public authToken:any;
  public name: any;
  public loginData = new BehaviorSubject({});
  token: any; 
  private jwtHelper = new JwtHelperService();
  public userRole : any;

  constructor(private http : HttpClient) { }

  public addLoginData (data: {}) {
    this.loginData.next(data)
  }

  public addToken(token: string) {
    localStorage.setItem("DocMachinlogintoken", token);
    this.authToken = token;
  }

  public addRole (role : any) {
    const userRole = localStorage.setItem("DocMachinloginRole", role);
    this.userRole = userRole
    return this.userRole
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem("DocMachinlogintoken");
    this.authToken = token;
    return this.authToken;
  }

  public register(user: any) {
    return this.http.post(`${this.apiUrl}/authenticate/signup`, {
      user: user
    });
  }

  public getCurrentUser() {
    const role:any = localStorage.getItem('DocMachinloginRole');
    return role; 
  }

  public isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: string): boolean {
    const userrole = this.getCurrentUser();
    return userrole == role ? true : false;
  }

  public login (loginData:any) {
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

  public verify(data:any) {
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
    return this.http.put(`${this.apiUrl}/authenticate/updateemail`, {
      data: data,
      emailId: email,
  });
  
  }

  public forgotpsw(loginData:any) {
    return this.http.put(`${this.apiUrl}/authenticate/forgotpsw`, {
      emailId: loginData,
    });
  }

  public updatePsw(data:any, email:any) {
    return this.http.put(`${this.apiUrl}/authenticate/updatepsw`, {
      newPassword: data.password1,
      emailId: email,
    });
  }

  public getAllUser() {
    return this.http.get(`${this.apiUrl}/authenticate/getAllUser`).toPromise();
  }

  public updateOneUser(data:any, value:any, emailId:any) {
    return this.http.put(`${this.apiUrl}/authenticate/updateOneUser`, {
      _id: data,
      data: value,
      emailId: emailId
    });
  }
  
}
