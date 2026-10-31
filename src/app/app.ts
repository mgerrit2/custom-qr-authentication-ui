import {Component, OnInit, signal, OnDestroy, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import {firstValueFrom, Subject} from 'rxjs';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AuthenticationRest} from './rest/Authentication-rest';
import {AuthService} from '../services/AuthService';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Spinner} from './components/spinner/spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MenubarModule,
    CommonModule,
    ButtonModule, FloatLabel, InputText, ReactiveFormsModule,Spinner,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit,OnDestroy{

  private readonly http = inject(HttpClient);
  private readonly authenticationRest = inject(AuthenticationRest);
  private readonly authService = inject(AuthService);

  currentUser: string ="mgerrit2";

  form = new FormGroup({
    userId: new FormControl(''),
  });

  get getUserId(): FormControl {
    // We cast it to FormControl to easily access its value property later
    return this.form.get('userId') as FormControl;
  }

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
    this.getUserId.setValue(this.currentUser);

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
   * Login the user
   */
  async login() {

    try{

      const tokenResponse
        = await firstValueFrom(this.authenticationRest.fetchJwt(this.currentUser));

      // Use the service to set the token immediately
      this.authService.setToken(tokenResponse.access_token);

      this.loginDisplay = true;

    } catch(e) {
      console.log(e);
    }
  }


  logout() {
    this.authService.setToken('');
    this.loginDisplay = false;
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  userIdFocusOut():void{
    this.currentUser = this.getUserId.value;
  }
}
