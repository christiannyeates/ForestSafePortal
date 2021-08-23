import { Component, OnInit,ChangeDetectorRef } from '@angular/core'; 
import {MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'; 
import { AssetModel } from '../../models/asset-model'; 
import { LoginService } from 'src/app/services/login/login.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ConvertToBSTService } from 'src/app/services/convert-to-bst.service';
import { MatTableDataSource } from '@angular/material/table';
interface Week  {startDate:number, startMonth:string, endDate: number, endMonth:string,startTime : Date,stopTime : Date};

export interface CheckIn {
  Id : number;
  operativeId: number;
  operativeName:string;
  position: number;
  weight: number;
  latitude : string;
  longitude : string;
  checkinDatetime : Date;
  comment : string;
  createdOn : Date;
  checkinAt : Date;
}  
@Component({
  selector: 'app-check-ins',
  templateUrl: './check-ins.component.html',
  styleUrls: ['./check-ins.component.scss']
})
export class CheckInsComponent implements OnInit {
  BST:string='+0100';
  weekControl = new FormControl('', Validators.required);
  monthNames  :string[] = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  weeks : Week[] = [];
  selected !: Week;
  CheckIns : CheckIn[] = [];
  displayedColumns: string[] = ['Dateandtime', 'Operative', 'Location', 'Comment'];
  dataSource : any;
  constructor(private convertToBSTService : ConvertToBSTService,private changeDetectorRefs: ChangeDetectorRef, private router: Router, private dashboardService: DashboardService,private loginService: LoginService) {
    this.BST =this.convertToBSTService.getLondonTimeZone();
    this.getWeekList();
    this.LoadData();

   }

  ngOnInit(): void {
  }
  getWeekList(){ 
    let date= new Date();
    date.setHours(0, 0, 0, 0);
    var day= date.getDay();
    let DaysToSunday = 7-day;
    if(DaysToSunday!=7){
      this.addDays(date, DaysToSunday) 
    }
    for(let a=0;a<4;a++){
      var lastDate =new Date(date);
      this.addDays(lastDate, -6)  
      let week: Week = {
        startTime :new Date(lastDate) ,
        stopTime: new Date(date),
        endDate: date.getDate(),
        endMonth:this.monthNames[date.getMonth()],
        startDate : lastDate.getDate(),
        startMonth:this.monthNames[lastDate.getMonth()] 
      }
      this.weeks.push(week);
      date=this.addDays(lastDate,-1);
    }
    this.selected = this.weeks[0]; 
  }
  addDays(todate: Date, days: number): Date {
    todate.setDate(todate.getDate() + days);
    return todate;
  }
  DateFilter(data:any){ 
    
    this.FilterShifts(data.startTime,data.stopTime);
  }
  FilterShifts(startTime : Date, EndTime : Date){    
    var enddate=this.addDays(EndTime,1);
    let _checkins  =  this.CheckIns.filter(ch=>ch.checkinAt >= startTime && ch.checkinAt <= enddate); 
    _checkins.sort((a, b) => (a.checkinAt > b.checkinAt) ? 1 : -1)
    _checkins.reverse();
    this.dataSource=  new MatTableDataSource(_checkins);  
    this.changeDetectorRefs.detectChanges();
}
  LoadData() {   
    this.dashboardService.getAllCheckins().subscribe((data) => { 
      debugger
        for( let i = 0; i < data.length; i++ ){
          var ct=new Date( data[i].checkinDatetime);
          let checkin: CheckIn ={ 
                                operativeId:data[i].operativeId,       
                                operativeName : data[i].operativeName,  
                                comment : data[i].comment,
                                latitude : data[i].latitude,
                                createdOn :new Date( data[i].createdOn),
                                longitude : data[i].longitude,
                                Id : data[i].id,
                                checkinAt: new Date( data[i].checkinDatetime),
                                checkinDatetime : new Date(Date.UTC(ct.getFullYear(), ct.getMonth(), ct.getDate(), ct.getHours(),ct.getMinutes()))  ,
                                weight : data[i].weigth,
                                position : data[i].position
                              } 
                this.CheckIns.push(checkin);         
        }
        this.dataSource=this.CheckIns;
        this.FilterShifts(this.weeks[0].startTime,this.weeks[0].stopTime);    
         
      }, (error) => { 
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in PostListComponent: " + error.message);
      }); 
      
}
}
