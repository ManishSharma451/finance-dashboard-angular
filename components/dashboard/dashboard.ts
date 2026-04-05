import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
 selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
  <div class="container mt-3">
   

    <div class="row g-3">
  <div class="col-md-4" *ngFor="let card of summary">
    <div class="card p-4 shadow-lg text-center">
      <h6 class="">{{card.title}}</h6>
      <h2 class="fw-bold">₹{{card.value}}</h2>
    </div>
  </div>
</div>
<br>
<br>
    <apx-chart
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [xaxis]="chartOptions.xaxis">
    </apx-chart>
  </div>
  `
})
export class DashboardComponent implements OnInit {
  summary: any[] = [];
  chartOptions: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.transactions$.subscribe(data => {
      const income = data.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
      const expense = data.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

      this.summary = [
        { title: 'Balance', value: income - expense },
        { title: 'Income', value: income },
        { title: 'Expenses', value: expense }
      ];

      this.chartOptions = {
        series: [{ name: 'Amount', data: data.map(d => d.amount) }],
        chart: { type: 'area', height: 300 },
        xaxis: { categories: data.map(d => d.date) }
      };
    });
  }
}