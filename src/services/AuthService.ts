import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Store token reactively in a Signal
  public readonly accessToken = signal<string | null>(sessionStorage.getItem('access_token'));

  public setToken(token: string) {
    sessionStorage.setItem('access_token', token);
    this.accessToken.set(token);
  }

  public clearToken() {
    sessionStorage.removeItem('access_token');
    this.accessToken.set(null);
  }
}
