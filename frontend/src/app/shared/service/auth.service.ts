import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../model/authResponse.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = "http://localhost:8080/api/v1";
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient, private router: Router) { }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`, {
      email: email,
      password: password
    }).pipe(
      tap((authResponse: AuthResponse) => {
        if(authResponse.token) {
          this.authenticate(authResponse.token);
        }
      })
    );
  }

  private authenticate(token: string) {
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('token', token);
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/register`, {
      email:email,
      password: password,
      role: 'USER'
    }).pipe(
      tap((authResponse: AuthResponse) => {
        if(authResponse.token) {
          this.authenticate(authResponse.token);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isTokenExpired(): boolean {
    const token: string | null = localStorage.getItem('token');

    if(!token) {
      return true;
    }

    const decoded = jwtDecode(token);
    const expirationDate = decoded.exp! * 1000;
    return expirationDate < new Date().getTime();
  }

  autoSignIn(): void {
    const token: string | null = localStorage.getItem('token');

    if(token && !this.isTokenExpired()) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(["auth"]);
  }
}