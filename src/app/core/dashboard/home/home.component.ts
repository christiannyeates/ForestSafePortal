import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LoginService } from 'src/app/services/login/login.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  CurrentUser :any;
  UserId : any;
  Greetings :string="";
  AssetsCount :string="0";
  OperativesCount :string="0";
  JobsCount :string="0";
  constructor(private router: Router, private loginService: LoginService, private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.LoadData();
  }
  LoadData(){
    this.UserId = this.loginService.getUserId(); 
    this.LoadAssetsData();
    this.LoadJobsData();
    this.LoadOperativesData();
    this.LoadOperative();
  } 
  LoadOperative() {  
    this.dashboardService.getOperative(this.UserId).subscribe((data) => {    
      this.CurrentUser = data;  
      this.Greetings = this.getGreeting(this.CurrentUser.firstName);
      }, (error) => { 
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in getOperative: " + error.message);
      }); 
  }
  LoadOperativesData() {  
    this.dashboardService.getAllOperatives().subscribe((data) => {    
        this.OperativesCount=data.length;
      }, (error) => { 
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in getAllOperatives: " + error.message);
      }); 
  }
  LoadAssetsData() {  
    this.dashboardService.getAssets().subscribe((data) => {    
        this.AssetsCount=data.length;
      }, (error) => { 
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in getAssets: " + error.message);
      }); 
  }
  LoadJobsData() {  
    this.dashboardService.getJobs().subscribe((data) => {    
        this.JobsCount=data.length;
      }, (error) => { 
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in getJobs: " + error.message);
      }); 
  }
  getGreeting(user:string){
    var d = new Date();
    var time = d.getHours();
    var greeting="";
    
    if (time < 12) {
      greeting= "Good morning, "+ user;
    }
    if (time >= 12 && time < 16) { 
      greeting= "Good afternoon, "+ user;
    }
    if (time >= 16) {
      greeting= "Good evening, "+ user; 
    }
  return greeting;
  }




}
