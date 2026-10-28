import {Component, OnInit, signal, OnDestroy, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {firstValueFrom, Subject} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AuthenticationRest} from './rest/Authentication-rest';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule,CommonModule, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit,OnDestroy{

  private readonly http = inject(HttpClient);
  private readonly authenticationRest = inject(AuthenticationRest);

  /** Geeft aan of de gebruiker is ingelogd */
  loginDisplay = false;

  /** Items voor de PrimeNG menubar */
  items: MenuItem[] | undefined;

  /** Subject om actieve subscriptions te stoppen bij vernietiging van de component (memory leak prevention) */
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {

    //region Menu instellingen configureren
    this.items = [
      {
        label: 'Two way authentication',
        icon: 'pi pi-home',
        routerLink: ['/app-two-way-authentication']
      },
    ]
    //endregion

  }


  /**
   * Start het inlogproces via een MSAL redirect. `${environment.apiUrl}/gscience-programming-help/api/v1/jwt`;
   */
  async login() {

    try{
      let tokenResponse = await firstValueFrom(this.authenticationRest.fetchJwt());
      sessionStorage.setItem('access_token', tokenResponse.access_token);
    } catch(e) {
      console.log(e);
    }


      /*
    this.http.post(`${environment.apiUrlJwtToken}/gscience-programming-help/api/v1/jwt`, {
      userId: 'mgerrit2',
      roles: 'ADMIN'
    }).subscribe((response: any) => {
      // Save the token here so the interceptor can find it later
      localStorage.setItem('access_token', response.access_token);
    });

       */
  }

  /**
   * Logt de gebruiker uit.
   */
  logout() {
    localStorage.removeItem('access_token');
    this.loginDisplay = false;
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

}
