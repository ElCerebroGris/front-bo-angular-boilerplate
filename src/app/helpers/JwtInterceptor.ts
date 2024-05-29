import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


export function jwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  const authToken = inject(AuthService).getToken();
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${authToken}`,
        Accept: 'application/json',
      },
    });
  }
  return next(req);
}
