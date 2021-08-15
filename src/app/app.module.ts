import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpErrorInterceptor } from './services/errorhandler/errorhandler.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { TimeSheetComponent } from './core/dashboard/time-sheet/time-sheet.component';
import { JobSheetComponent } from './core/dashboard/job-sheet/job-sheet.component';
import { CheckInsComponent } from './core/dashboard/check-ins/check-ins.component';
import { OperativesComponent } from './core/dashboard/operatives/operatives.component';
import { AssetsComponent } from './core/dashboard/assets/assets.component';
import { HomeComponent } from './core/dashboard/home/home.component';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { JobsComponent } from './core/dashboard/jobs/jobs.component';
import {MatTableModule} from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';   

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TimeSheetComponent,
    JobSheetComponent,
    CheckInsComponent,
    OperativesComponent,
    AssetsComponent,
    HomeComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    DashboardModule,
    MatTableModule, 
    MatSelectModule,
    NgbModule,
    NoopAnimationsModule,    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
