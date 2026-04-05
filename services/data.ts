import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private initialData: Transaction[] = JSON.parse(localStorage.getItem('tx') || '[]');

  private transactions = new BehaviorSubject<Transaction[]>(
    this.initialData.length ? this.initialData : [
      { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' }
    ]
  );

  transactions$ = this.transactions.asObservable();

  addTransaction(tx: Transaction) {
    const updated = [...this.transactions.value, tx];
    this.transactions.next(updated);
    localStorage.setItem('tx', JSON.stringify(updated));
  }

  deleteTransaction(id: number) {
  const updated = this.transactions.value.filter(t => t.id !== id);
  this.transactions.next(updated);
  localStorage.setItem('tx', JSON.stringify(updated));
}
}