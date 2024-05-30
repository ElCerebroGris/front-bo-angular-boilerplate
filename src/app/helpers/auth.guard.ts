import { AuthService } from './../services/auth.service';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    // your  logic goes here
    const auth = inject(AuthService);
    const router = inject(Router);

    const userLoggedIn = auth.getUserOnlineStatus();
    const userIsAdmin = auth.getUserOnlineStatus();
    const targetUrl = state.url;

    if (userLoggedIn) {
      if (
        targetUrl === '/administration-dashboard' ||
        targetUrl === '/administration-senders' ||
        targetUrl === '/administration-users'
      ) {
        if (!userIsAdmin) {
          router.navigate(['/dashboard']);
          return false;
        }
      }
      return true;
    }

    router.navigate(['/login']);
    return false;
}
