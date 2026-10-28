import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {TwoWayAuthentication} from './components/two-way-authentication/two-way-authentication';


export const routes: Routes = [
  {
    path: '',
    component: Home // Public page - NO MsalGuard here
  },
  {
    path: 'app-two-way-authentication',
    component: TwoWayAuthentication,
  },
  {
    path: '**',
    redirectTo: '' // Optioneel: Stuur onbekende URL's terug naar Home
  }
];
