import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository/repository.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AssetModel } from '../../core/models/asset-model'; 
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
asset:any;
  constructor(   private router: Router, private repositoryService: RepositoryService  ) { }

 
  getCheckIns(operativeId:number) {
    return this.repositoryService.get('DriverCheckin/GetDriverCheckin/'+operativeId,true)
        .pipe(map((checkins: any) => { 
             return checkins;
        })); 
  }
  getAllCheckins() {
     return this.repositoryService.get('DriverCheckin/GetAllCheckins/',true)
         .pipe(map((checkins: any) => { 
              return checkins;
         })); 
   } 
   UpdateJob(Job:any ) {
     return this.repositoryService.post('Job/UpdateJob', Job, true)
         .pipe(map((response: any) => { 
              return response;
         })); 
   }
   AddJob(Job:any ) {
     return this.repositoryService.post('Job/AddJob', Job, true)
         .pipe(map((response: any) => { 
              return response;
         })); 
   }
  getJobs() {
    return this.repositoryService.get('Job/GetJobs',true)
        .pipe(map((Jobs: any) => { 
             return Jobs;
        })); 
  }
  getShifts() {
    return this.repositoryService.get('Shift/GetAllShift',true)
        .pipe(map((shifts: any) => { 
             return shifts;
        })); 
  }
  getAllJobShifts() {
     return this.repositoryService.get('Job/GetAllJobShifts',true)
         .pipe(map((shifts: any) => { 
              return shifts;
         })); 
   }
  
  addAsset(assetModel:AssetModel ) {
    return this.repositoryService.post('Asset/AddAsset', assetModel, true)
        .pipe(map((response: any) => { 
             return response;
        })); 
  }
  getAssets() {
     return this.repositoryService.get('Asset/GetAssets',true)
         .pipe(map((asset: any) => { 
              return asset;
         })); 
   }

  getAllOperatives() {
     return this.repositoryService.get('Auth/GetOperatives', true)
         .pipe(map((response: any) => { 
              return response;
         })); 
   }

   getOperative(operativeId?:number) {
     return this.repositoryService.get('Auth/GetOperative/'+operativeId,true)
         .pipe(map((operative: any) => { 
              return operative;
         })); 
   }
   UpdateOperative(OperativeModel:any ) {
     return this.repositoryService.post('Auth/UpdateOperative', OperativeModel, true)
         .pipe(map((response: any) => { 
              return response;
         })); 
   }

   GetSafetyCheckFormResult(SafetyCheckFormResultId?:number) {
     return this.repositoryService.get('SafetyCheckForm/GetSafetyCheckFormResult/'+SafetyCheckFormResultId,true)
         .pipe(map((SafetyCheckFormResult: any) => { 
              return SafetyCheckFormResult;
         })); 
   }
  
}
