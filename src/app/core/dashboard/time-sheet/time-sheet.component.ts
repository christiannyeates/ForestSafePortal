import {FormControl, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';  
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router'; 
import { MatTableDataSource } from '@angular/material/table';
import { ConvertToBSTService } from 'src/app/services/convert-to-bst.service';
interface Week  {startDate:number, startMonth:string, endDate: number, endMonth:string,startTime : Date,stopTime : Date};
export interface Shift {
  shiftId? : number,
  operativeId : number,
  operativeName :string,
  startTime : Date ,
  stopTime : Date,
  startLongitude? : string,
  startLatitude ?: string,
  stopLongitude? : string,
  stopLatitude? : string,
  shiftStatus? : string,
  createdOn : Date,
  createdBy? : string,
  overnight : boolean,
  hours : string
}
export interface OperativeShift {
  operativeId?: number,
  operativeName?: string,
  totalHours:string,
  totalShifts? :number,
  DateTime?:Date,
  shifts ?: Shift[]
}
@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TimeSheetComponent implements OnInit {
  weekControl = new FormControl('', Validators.required);
  BST:string='+0100';
  monthNames  :string[] = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  weeks : Week[] = [];
  selected !: Week;
  shifts : Shift[] = [];
  operativeShifts : OperativeShift[] = [];
  dataSource : any;
  columnsToDisplay = ['Date', 'Operative', 'Hours', 'StartShift', 'StopShift','OverNight','StartLocation' ,'StopLocation'];
  expandedElement!: any | null;
   constructor(private convertToBSTService : ConvertToBSTService, private changeDetectorRefs: ChangeDetectorRef, private router: Router, private dashboardService: DashboardService, private loginService: LoginService) { 
    this.BST =this.convertToBSTService.getLondonTimeZone(); 
    this.getWeekList();

   } 
  ngOnInit(): void {
    this.LoadData();
  }
  DateFilter(data:any){  
    this.FilterShifts(data.startTime,data.stopTime);
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

  CalculateHours(end:Date,start:Date){ 
    var diffMs = (end.getTime() - start.getTime()); // milliseconds between start & end 
    return this.miliSecondToTime(diffMs);
  }
  CalculateTotalHours(shifts:Shift[]){
    var totalMiliseconds =0; 
    for(var i=0; i < shifts.length;i++){   
      var diffMs = (shifts[i].stopTime.getTime() - shifts[i].startTime.getTime());
      diffMs = diffMs < 0 ? 0:diffMs;  
      totalMiliseconds=totalMiliseconds+diffMs; 
    }    
    console.log(this.miliSecondToTime(totalMiliseconds));
    return this.miliSecondToTime(totalMiliseconds);
  }
   miliSecondToTime(s:any) {
     s= s < 0 ? 0: s ;
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ' h ' + mins + 'm' ;
  }
  addDays(todate: Date, days: number): Date {
    todate.setDate(todate.getDate() + days);
    todate.setHours(0, 0, 0, 0);
    return todate;
  }
  FilterShifts(startTime : Date, EndTime : Date){  
    var enddate=this.addDays(EndTime,1);
      this.operativeShifts=[];
      let _shifts  =  this.shifts.filter(sh=>sh.createdOn >= startTime && sh.createdOn <= enddate);
      _shifts.sort((a, b) => (a.createdOn > b.createdOn) ? 1 : -1)
      let unique = [];
      var operativeNames:string[]=[];
      var distinct:number[] = [];
      for( let i = 0; i < _shifts.length; i++ ){
          if( !unique[_shifts[i].operativeId]){
              distinct.push(_shifts[i].operativeId);
              operativeNames.push(_shifts[i].operativeName)
              unique[_shifts[i].operativeId] = 1;
          }
      }
      for(var a=0;a<distinct.length;a++){
        var _operativeShifts =_shifts.filter(op=>op.operativeId ==  distinct[a]);
          var OS: OperativeShift = {totalShifts:_operativeShifts.length ,operativeId : distinct[a],operativeName:operativeNames[a],totalHours: this.CalculateTotalHours(_operativeShifts),shifts:_operativeShifts};
          this.operativeShifts.push(OS);
      }
      this.dataSource=  new MatTableDataSource(this.operativeShifts);  
      this.changeDetectorRefs.detectChanges();
  }
LoadData() {  
  this.dashboardService.getShifts().subscribe((data) => { 
      for( let i = 0; i < data.length; i++ ){ 
        var st= new Date(data[i].startTime);
        var et= new Date(data[i].stopTime);  
        let shift: Shift ={ shiftId : data[i].shiftId,
                            operativeId:data[i].operativeId,
                            startTime:new Date(Date.UTC(st.getFullYear(), st.getMonth(), st.getDate(), st.getHours(),st.getMinutes())),
                            createdBy: data[i].createdBy,
                            createdOn: new Date(data[i].createdOn),
                            shiftStatus : data[i].shiftStatus,
                            startLatitude: data[i].startLatitude,
                            startLongitude: data[i].startLongitude,
                            stopLatitude: data[i].stopLatitude,
                            stopLongitude: data[i].stopLongitude,
                            operativeName : data[i].operativeName,
                            stopTime:   new Date(Date.UTC(et.getFullYear(), et.getMonth(), et.getDate(), et.getHours(),et.getMinutes())),
                            overnight : data[i].overnight,
                            hours : this.CalculateHours(new Date(data[i].stopTime),new Date(data[i].startTime))
                          } 
              this.shifts.push(shift);         
      } 
      this.FilterShifts(this.weeks[0].startTime,this.weeks[0].stopTime);   
      
    }, (error) => { 
      if(error.status==401){
        this.loginService.doLogout();
        this.router.navigateByUrl('/'); 
      }
      console.log("Error in loginService: " + error.message);
    }); 
} 
}
 