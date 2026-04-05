import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Role {
  private roleSubject = new BehaviorSubject<'admin' | 'viewer'>('viewer');
  role$ = this.roleSubject.asObservable();

   setRole(role: 'admin' | 'viewer') {
    this.roleSubject.next(role);
  }

  getRole() {
  return this.roleSubject.value;
 }
}
