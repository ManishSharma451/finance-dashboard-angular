import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class App {
  // protected readonly title = signal('finance-dashboard');
}
