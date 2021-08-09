import { Routes, RouterModule }  from '@angular/router';
import { DashboardComponent }    from './dashboard.component'; 
import { AuthGuard }             from '../../services/auth-guard.guard'; 
import { NgModule } from  '@angular/core';  
import { AssetsComponent } from  './assets/assets.component';
import { CheckInsComponent } from  './check-ins/check-ins.component';
import { JobSheetComponent } from  './job-sheet/job-sheet.component';
import { OperativesComponent } from  './operatives/operatives.component';
import { TimeSheetComponent } from  './time-sheet/time-sheet.component';
import { JobsComponent } from  './jobs/jobs.component';
import { HomeComponent } from  './home/home.component';


const  routes:  Routes  = [
{
    path: 'dashboard',  
    component:DashboardComponent, 
    canActivate: [AuthGuard],
    children: [
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        },
        {
            path:  'home',
            component:  HomeComponent
        },
        {
            path:  'assets',
            component:  AssetsComponent
        },
        {
            path:  'job-sheets',
            component:  JobSheetComponent
        },
        {
            path:  'time-sheets',
            component:  TimeSheetComponent
        },
        {
            path:  'operatives',
            component:  OperativesComponent
        },
        {
            path:  'CheckIns',
            component:  CheckInsComponent
        }
        ,
        {
            path:  'Jobs',
            component:  JobsComponent
        }
    ]
    }
    ];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export  class  DashboardRoutingModule { }