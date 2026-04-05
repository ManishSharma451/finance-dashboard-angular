import { Component } from '@angular/core';
import { DataService } from '../../services/data';
// import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role } from '../../services/role';


@Component({
  selector: 'app-transactions',
  standalone: true,
 imports: [CommonModule, FormsModule],
  template: `
  <div *ngIf="role === 'admin'" class="container col-md-4 mt-3">
   <input type="number" [(ngModel)]="amount" placeholder="Enter Amount..." class="form-control mb-2" />
    <input [(ngModel)]="category" placeholder="Enter Category" class="form-control mb-2" />
    <select [(ngModel)]="type" class="form-control mb-2">
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
    <button class="btn btn-primary" (click)="add()">Add Data</button>
    
</div>

<br>
<br>

    <h5 class="text-center">All Transactions</h5>
  <br>
  <br>

  <div class="row mb-3 mx-2">

         <div class="col-md-2">
           <input type="date" [(ngModel)]="startDate" class="form-control" />
         </div>

         <div class="col-md-2">
            <input type="date" [(ngModel)]="endDate" class="form-control" />
         </div>

          <div class="col-md-2">
             <select [(ngModel)]="selectedCategory" class="form-control">
                   <option value="">All Categories</option>
                   <option *ngFor="let t of transactions" [value]="t.category">
                            {{t.category}}
                   </option>
             </select>
          </div>
          <div class="col-md-2">
          </div>
          <div class="col-md-4">
               <input
                  type="text"
                  [(ngModel)]="searchTerm"
                  placeholder="Search by category or type..."
                  class="form-control"
                  />
          </div>
</div>


<div class="table-responsive">
    <table class="table table-hover">
    <thead>
    <tr>
    <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Reason For</th>
          <th scope="col">Type</th>
          <th *ngIf="role === 'admin'">Action</th>
    </tr>
  </thead>
  <tbody>
      <tr *ngFor="let t of filteredTransactions();let i = index">
       <th scope="row">{{i+1}}</th>
        <td>{{t.date}}</td>
        <td>₹{{t.amount}}</td>
        <td>{{t.category}}</td>
        <td>{{t.type}}</td>
        <td *ngIf="role === 'admin'">
        <button class="btn btn-danger btn-sm" (click)="delete(t.id)">
          Delete
        </button>
      </td>
      </tr>
      </tbody>
    </table>
    </div>

 
  `
})
export class Transactions {
    amount: any;
    category = '';
    type: any = 'expense';
    transactions: any[] = [];

    startDate: string = '';
    endDate: string = '';
    selectedCategory: string = '';

    searchTerm: string = '';

    role: 'admin' | 'viewer' = 'viewer';

  constructor(private dataService: DataService, private roleService: Role) {
    // this.dataService.transactions$.subscribe(d => this.transactions = d);
  }


  ngOnInit() {

     this.dataService.transactions$.subscribe(data => {
      this.transactions = data;
    });

      this.roleService.role$.subscribe(r => this.role = r);
}

get categories(): string[] {
  return [...new Set(this.transactions.map(t => t.category))];
}


  add(input:HTMLInputElement) {
    this.dataService.addTransaction({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: +this.amount,
      category: this.category,
      type: this.type
    });
    input.value = ''
  }

 delete(id: number) {
    this.dataService.deleteTransaction(id);
  }

  filteredTransactions() {
   return this.transactions.filter(t => {

    const txDate = new Date(t.date);

    const afterStart = this.startDate ? txDate >= new Date(this.startDate) : true;
    const beforeEnd = this.endDate ? txDate <= new Date(this.endDate) : true;

    const categoryMatch = this.selectedCategory
      ? t.category === this.selectedCategory
      : true;
      //  console.log({
            //  start: this.startDate,
            //  end: this.endDate,
            //  category: this.selectedCategory
// });

 // 🔍 Search filter (NEW)
    const searchMatch = this.searchTerm
      ? t.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      : true;
    return afterStart && beforeEnd && categoryMatch && searchMatch;
  });
}
}
