import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../services/AuthService';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.setToken('');
  }


}
