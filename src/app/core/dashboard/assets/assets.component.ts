import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'; 
import { AssetModel } from '../../models/asset-model';
import { LoginService } from 'src/app/services/login/login.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  Assets : any = [];
  assetsCount : string = "0";
  closeModal: string="";
  NewAssetForm!: FormGroup;
  editAssetForm!: FormGroup;
  newSubmitted = false;
  editSubmitted = false;
  constructor( private formBuilder: FormBuilder, private router: Router, private dashboardService: DashboardService, private loginService: LoginService,private modalService: NgbModal) {

    this.LoadData();
   }

  ngOnInit():  void {
    this.NewAssetForm = this.formBuilder.group({ 
      name:	 ['', [Validators.required]], 
      description: ['', [Validators.required]],  
      photo:	 ['7567346587'], 
      serialNumber:	 ['', [Validators.required]], 
      regNumber:	 ['', [Validators.required]]  
    }); 
  }
  editTriggerModal(asset:any, id:any) {
    this.editAssetForm = this.formBuilder.group({ 
      Id : [asset.assetId, Validators.required],
      name:	 [asset.name, [Validators.required]], 
      description: [asset.description, [Validators.required]],  
      photo:	 '7567346587',   
      serialNumber:	 [asset.serialNumber, [Validators.required]], 
      regNumber:	 [asset.regNumber, [Validators.required]]  
    }); 
    this.modalService.open(id, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  newTriggerModal(id:any) { 
    this.modalService.open(id, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  onSubmitNewAsset() {
    if (this.NewAssetForm.valid) {
      this.dashboardService.addAsset(this._AssetValue()).subscribe(() => {  
        window.location.reload();
      });
    }
  }
  onSubmitEditAsset() {  
    if (this.editAssetForm.valid) {
      this.dashboardService.addAsset(this._editAssetValue()).subscribe(() => {  
        window.location.reload();
       },(error) => { 
        if(error.status==401){
          this.loginService.doLogout();
          this.router.navigateByUrl('/'); 
        }
        console.log("Error in getassets: " + error.message);
      } );
    }
  }
   
  _AssetValue() {
    return this.NewAssetForm.value;
  }
  
  _editAssetValue() {
    return this.editAssetForm.value;
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
  LoadData() {  
      this.dashboardService.getAssets().subscribe((data) => {  
          this.Assets=data;
          this.assetsCount=data.length;
        }, (error) => { 
          if(error.status==401){
            this.loginService.doLogout();
            this.router.navigateByUrl('/'); 
          }
          console.log("Error in getassets: " + error.message);
        }); 
  } 
}
