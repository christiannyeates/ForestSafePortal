import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  public Logout(){
    this.loginService.doLogout();
    this.router.navigateByUrl('/');  
  }

}
