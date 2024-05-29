import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl = 'https://api.restful-api.dev/';

  constructor(private http: HttpClient) {}

  getter(url: string): Observable<any> {
    return this.http.get(this.baseUrl+url, { responseType: 'json' });
  }

  postter(url: string, model: any) {
    return this.http.post(this.baseUrl+url, model);
  }

  putter(url: string, model: any) {
    return this.http.put(this.baseUrl+url, model);
  }

  patcher(url: string, model: any) {
    return this.http.patch(this.baseUrl+url, model);
  }
}
