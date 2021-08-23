import {FormControl, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';  
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router'; 
import { MatTableDataSource } from '@angular/material/table';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
interface Week  {startDate:number, startMonth:string, endDate: number, endMonth:string,startTime : Date,stopTime : Date};

export interface SafetyCheckFormResult{
  assetId: number,
  comment: string,
  coolant: string,
  createdOn: Date,
  engineHours: number,
  engineOil: boolean,
  fireExtinguisher: boolean,
  firstAidKit: boolean,
  hydraulicOil: boolean,
  id: number,
  jobId: number,
  leaks: boolean,
  operativeId: number,
  safetyCheckAnswer: string,
  spillKit: boolean,
  transmissionOil: boolean,
  wheelsTyres: boolean, 
}
export interface Shift {
  jobShiftId? : number,
  operativeId : number,
  operativeName :string,
  jobName : string,
  startTime : Date,
  stopTime : Date,
  SafetyCheckFormResultId:number,
  startLongitude? : string,
  startLatitude ?: string,
  stopLongitude? : string,
  stopLatitude? : string,
  shiftStatus? : string,
  createdOn : Date,
  createdBy? : string
  hours : string,
  tonnage : number
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
  selector: 'app-job-sheet',
  templateUrl: './job-sheet.component.html',
  styleUrls: ['./job-sheet.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class JobSheetComponent implements OnInit {
  weekControl = new FormControl('', Validators.required);
  monthNames  :string[] = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  weeks : Week[] = [];
  selected !: Week;
  closeModal: string="";
  _safetyCheckFormResult:any={}
  shifts : Shift[] = [];
  operativeShifts : OperativeShift[] = [];
  dataSource : any;
  columnsToDisplay = ['Date', 'Operative', 'Hours', 'Tonnage', 'Job','SafetyChecks','StartLocation' ,'StopLocation'];
  expandedElement!: any | null;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router, private dashboardService: DashboardService, private loginService: LoginService, private modalService: NgbModal) {
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
  LoadCheckFormPopUp(shift:Shift,Id:any){
    this.dashboardService.GetSafetyCheckFormResult(shift.SafetyCheckFormResultId).subscribe((data:any) => {   
      this._safetyCheckFormResult ={  assetId : data.assetId,
                                      comment: data.comment,
                                      coolant: data.coolant,
                                      createdOn: data.createdOn,
                                      engineHours: data.engineHours,
                                      engineOil: data.engineOil,
                                      fireExtinguisher: data.fireExtinguisher,
                                      firstAidKit: data.firstAidKit,
                                      hydraulicOil: data.hydraulicOil,
                                      id: data.id,
                                      jobId: data.jobId,
                                      leaks: data.leaks,
                                      operativeId: data.operativeId,
                                      safetyCheckAnswer: data.safetyCheckAnswer,
                                      spillKit: data.spillKit,
                                      transmissionOil: data.transmissionOil,
                                      wheelsTyres: data.wheelsTyres,
                                      windowsClean: data.windowsClean,
                                      assetName : data.assetName
                                    } 
      this.modalService.open( Id, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      });
      }, (error) => {  
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in getAllJobShifts: " + error.message);
      }); 
    
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  addDays(todate: Date, days: number): Date {
    todate.setDate(todate.getDate() + days);
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
  this.dashboardService.getAllJobShifts().subscribe((data) => { 
    debugger  
      for( let i = 0; i < data.length; i++ ){
        let shift: Shift ={ jobShiftId : data[i].jobShiftId,
                            operativeId:data[i].operativeId,
                            startTime: new Date(data[i].startTime),
                            createdBy: data[i].createdBy,
                            createdOn: new Date(data[i].createdOn),
                            shiftStatus : data[i].shiftStatus,
                            startLatitude: data[i].startLatitude,
                            startLongitude: data[i].startLongitude,
                            stopLatitude: data[i].stopLatitude,
                            stopLongitude: data[i].stopLongitude,
                            operativeName : data[i].operativeName,
                            stopTime: new Date(data[i].stopTime),
                            jobName : data[i].jobName,
                            SafetyCheckFormResultId : data[i].safetyCheckFormResultId,
                            tonnage : data[i].tonnage == null?0:data[i].tonnage,
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
      console.log("Error in getAllJobShifts: " + error.message);
    }); 
} 

}
