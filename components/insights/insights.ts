import { Component, computed, OnInit } from '@angular/core';
import { DataService } from '../../services/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container mt-3">
    <h4>Insights</h4>
    <p>Highest Spending Category: <strong> {{highest}} </strong></p>
    <p>This Month: ₹{{monthlyExpense}}</p>
    <p>Last Month: ₹{{lastMonthExpense}}</p>
     <p *ngIf="monthlyExpense > lastMonthExpense"><br>
          <span class="alert alert-warning" role="alert">  
            ⚠ You are spending more than last month
          </span>
       
     </p>
  </div>
  `
})
export class Insights implements OnInit {
  highest = '';
  monthlyExpense = 0;
  lastMonthExpense = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.transactions$.subscribe(data => {
      const map: any = {};
      const now = new Date().getMonth();
      const last = now - 1;
      data.forEach(t => {
          const m = new Date(t.date).getMonth();
        if (t.type === 'expense') {
          map[t.category] = (map[t.category] || 0) + t.amount;
           if (m === now) this.monthlyExpense += t.amount;
        if (m === last) this.lastMonthExpense += t.amount;
        }
      });
      this.highest = Object.keys(map).reduce((a, b) => map[a] > map[b] ? a : b);
    });
  }
}
