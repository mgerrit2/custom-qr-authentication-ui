import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TokenResponse} from './dto/TokenResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationRest
{

  private readonly baseUrl = `${environment.apiUrlJwtToken}/api/v1/jwt`;

  private readonly http = inject(HttpClient);

  fetchJwt(userId:string): Observable<TokenResponse> {

    // Add query parameters (?userid=mgerrit2)
    const params = new HttpParams().set('userid', userId);

    // HttpClient post call (passing an empty body {} since curl has no body specified)
    return this.http.post<any>(this.baseUrl, {}, { params });
  }
}
