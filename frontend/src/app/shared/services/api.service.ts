import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers: HttpHeaders;

  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', `application/json`);
  }

  protected get(url: string, params = {}, headers = {}): Observable<any> {
    return new Observable(observer => {
      this.http.get<any>(url, { headers, params }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  protected post(url: string, body: any, headers = {}): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(url, body, { headers }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  protected put(url: string, body: any, headers = {}): Observable<any> {
    return new Observable(observer => {
      this.http.put<any>(url, body, { headers }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  protected delete(url: string, body = {}, headers = {}): Observable<any> {
    return new Observable(observer => {
      this.http.request('delete', url, { headers, body }).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }

  protected request(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    options = {}
  ): Observable<any> {
    return new Observable(observer => {
      this.http.request<any>(method, url, options).subscribe(
        response => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }
}
