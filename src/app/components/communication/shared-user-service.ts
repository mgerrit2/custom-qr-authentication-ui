import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedUserService {
  // Using Signals for state management
  sharedData = signal<string>('Initial Value');

  updateUserId(newValue: string) {
    this.sharedData.set(newValue);
  }
}
