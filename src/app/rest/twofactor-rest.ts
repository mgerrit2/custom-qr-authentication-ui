import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable,tap} from "rxjs";
import {environment} from "../../environments/environment";
import {SetupResponse} from './dto/SetupResponse';
import {VerifyRequest} from './dto/VerifyRequest';


@Injectable({
  providedIn: 'root',
})
export class TwofactorRest {

  private readonly baseUrl = '/api/1.0/2fa'

  private readonly http = inject(HttpClient);

    /**
     * Triggers the 2FA setup on the backend.
     * Passes the user details and returns the Base64 QR code Data URI.
     */
  public setupDevice(): Observable<SetupResponse> {
      const url = `${environment.apiUrl}${this.baseUrl}/setup`;

      // CRITICAL: You must pass userDto as the second argument so the backend receives the @RequestBody
        /*


         */
        return this.http.get<SetupResponse>(url).pipe(
            tap(qrResponse => {
                console.log('2FA QR Code succesvol gegenereerd:', qrResponse);
            })
        );
    }



}
