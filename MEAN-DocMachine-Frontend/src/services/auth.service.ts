import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  constructor(private http : HttpClient) { }

  public addLoginData (data: {}) {
    this.loginData.next(data)
  }

  public addToken(token: string) {
    localStorage.setItem("DocMachinlogintoken", token);
    this.authToken = token;
  }
  public loadFromLocalStorage() {
    const token = localStorage.getItem("DocMachinlogintoken");
    this.authToken = token;
    return this.authToken;
  }

  public isLoggedIn(): any {
    const token = localStorage.getItem("DocMachinlogintoken");
    this.authToken = token;
    if (this.authToken === null) {
      return false; 
    } else {
      return true;
    }
  }

  public getUserRole(): string | null {
    const token = localStorage.getItem('DocMachinlogintoken');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken)
      return decodedToken?.role || null; // Check for a 'role' property and return it, otherwise null
    } else {
      return null;
    }
  }
  public register(user: any) {
    return this.http.post(`${this.apiUrl}/authenticate/signup`, {
      user: user
    });
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
}
