import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LoginService } from 'src/app/services/login/login.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  CurrentUser :any;
  UserId : any;
  constructor(private router: Router, private loginService: LoginService, private dashboardService : DashboardService ) { }

  ngOnInit(): void {
  }
  public Logout(){
    this.loginService.doLogout();
    this.router.navigateByUrl('/');  
  }

  getOperative(){
    this.UserId = this.loginService.getUserId();
    this.CurrentUser = this.dashboardService.getOperative(this.UserId);
  } 

}
