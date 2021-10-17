import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  readonly baseURL = 'http://localhost:5000/api/auth';


  login(obj: any): Observable<string> {
    return this.http.post<string>(`${this.baseURL}/login`, obj);
  }

  public isAuthenticated(): boolean {
    const token = (localStorage.getItem('token') ?? undefined);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
