import { Component } from '@angular/core';
import { Role } from '../../services/role';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterModule,FormsModule],
   template: `
  <nav class="navbar navbar-dark bg-dark text-white px-3">
    <span class="navbar-brand">Finance Dashboard</span>
    <div>
      <a routerLink="/" class="text-white me-2">Dashboard</a>
      <a routerLink="/transactions" class="text-white me-2">Transactions</a>
      <a routerLink="/insights" class="text-white me-2">Insights</a>
       <select [(ngModel)]="role" (change)="changeRole()" class="btn btn-sm btn-light">
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      <button class="btn btn-sm btn-light ms-2" (click)="toggleTheme()">
                {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>
  </nav>
  `
})
export class Header {

  isDark = false;

    role: 'admin' | 'viewer' = 'viewer';

  constructor(private roleService: Role) {}

  ngOnInit() {
  const saved = localStorage.getItem('theme');
  this.isDark = saved === 'dark';
  this.applyTheme();
}

toggleTheme() {
  this.isDark = !this.isDark;
  localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  this.applyTheme();
}

applyTheme() {
  if (this.isDark) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

 changeRole() {
    this.roleService.setRole(this.role);
  }
}
