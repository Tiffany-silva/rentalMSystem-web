import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // logs out the user
  signOut(): void {
    window.sessionStorage.clear();
  }

  // saves Token
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  // retrieves token from the storage
  public getToken(): string | null{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // saves the user to local storage
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // returns the current user
  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    console.log(token);
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
}
