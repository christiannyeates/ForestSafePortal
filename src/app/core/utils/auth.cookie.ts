import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthCookie {
  constructor() { }

  getAuth(): string {
    return Cookie.get('userData');
  }

  setAuth(value: string): void {
    //0.0138889//this accept day not minuts
    Cookie.set('userData', value, 0.27);
  }

  deleteAuth(): void {
    Cookie.delete('userData');
  }
}
