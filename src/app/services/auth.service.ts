import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { GeneralConstants } from '../constants/GeneralConstants';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { EventEmitter } from 'stream';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isBrowser: boolean;

  private userOnlineSubject: BehaviorSubject<boolean>;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY)) {
      this.userOnlineSubject = new BehaviorSubject<boolean>(true);
    }else{
      this.userOnlineSubject = new BehaviorSubject<boolean>(false);
    }
  }

  getToken() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
  }

  setLogin(user: User) {
    localStorage.setItem(GeneralConstants.USER_AUTH.USERID_KEY, user.id!);
    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, user.token!);
    localStorage.setItem(
      GeneralConstants.USER_AUTH.USEREMAIL_KEY,
      user.email_or_phone_number!
    );
    localStorage.setItem(
      GeneralConstants.USER_AUTH.USERNAME_KEY,
      user.username!
    );
    localStorage.setItem(GeneralConstants.USER_AUTH.ROLE_KEY, user.role!);
    this.setUserOnlineStatus(true);
  }

  logout() {
    localStorage.removeItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USEREMAIL_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.ROLE_KEY);
    this.setUserOnlineStatus(false);
    this.router.navigate(['/login']);
  }

  verifyUserLoged() {
    if (this.isBrowser) {
      return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
    }
    return false;
  }

  setUserOnlineStatus(status: boolean): void {
    this.userOnlineSubject.next(status);
  }

  isUserOnline(): Observable<boolean> {
    return this.userOnlineSubject.asObservable();
  }

  getUserOnlineStatus(): boolean {
    return this.userOnlineSubject.getValue();
  }
}
