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

  getAssets() {
    return this.repositoryService.get('Asset/GetAssets',true)
        .pipe(map((asset: any) => { 
             return asset;
        })); 
  }
  getJobs() {
    return this.repositoryService.get('Job/GetJobs',true)
        .pipe(map((Job: any) => { 
             return Job;
        })); 
  }
  AddAsset(assetModel:AssetModel ) {
    return this.repositoryService.post('api/Asset/AddAsset', assetModel, true)
        .pipe(map((response: any) => { 
             return response;
        })); 
  }
}
