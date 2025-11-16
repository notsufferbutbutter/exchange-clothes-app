import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn = signal<boolean>(false);

  constructor() {

  }

  login() { this.isLoggedIn.set(true); }

  logout() { this.isLoggedIn.set(false); }
}
