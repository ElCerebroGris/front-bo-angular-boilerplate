import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private service: GeneralService,
    private auth: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl = req.url;
    const authorizationHeader = req.headers.get('Authorization');

    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && req.method === 'POST') {
            //this.service.callNotification('success');
          }
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          //this.service.callNotification('error', `Error: ${err.error.message}`);
        } else {
          //this.service.callNotification('error', `Error Code: ${err.status}\nMessagem: ${err.message}`);
        }

        let title = 'Erro de Conectividade';
        let errorMessage = 'Não foi possível comunicar-se com o servidor';

        if (err.status == 400 || err.status == 403 || err.status == 422) {
          title = 'Erro de Requisição';
          const errorMessageList = err.error.errors;
          const errorMessage = errorMessageList.map((obj: { message: any; }) => obj.message).join(', ');
          //this.service.callNotification('error', errorMessage);
        }

        if (err.status == 500) {
          //this.service.callNotification('error', errorMessage);
        }
        return throwError(err);
      })
    );
  }
}
