import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'; 
import { AssetModel } from '../../models/asset-model'; 
import { LoginService } from 'src/app/services/login/login.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-check-ins',
  templateUrl: './check-ins.component.html',
  styleUrls: ['./check-ins.component.scss']
})
export class CheckInsComponent implements OnInit {
  CheckIns : any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router,private dashboardService: DashboardService,private loginService: LoginService) {
    this.LoadData();
   }

  ngOnInit(): void {
  }
  
  LoadData() {  
    this.dashboardService.getJobs().subscribe((data) => { 
        debugger 
        this.CheckIns=data; 
      }, (error) => {
        debugger
        // handle error
        debugger
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in PostListComponent: " + error.message);
      }); 
      
}
}
