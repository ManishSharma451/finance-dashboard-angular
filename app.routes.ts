import { Routes } from '@angular/router';
import { Transactions } from './components/transactions/transactions';
import { Insights } from './components/insights/insights';
import { DashboardComponent } from './components/dashboard/dashboard';



export const routes: Routes = [
    {
        path:'', component: DashboardComponent
    },
    {
        path:'transactions', component: Transactions
    },
    { 
        path: 'insights', component: Insights 

    }
];
