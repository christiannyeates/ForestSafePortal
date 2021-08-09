import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'; 
import { AssetModel } from '../../models/asset-model'; 
import { LoginService } from 'src/app/services/login/login.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-operatives',
  templateUrl: './operatives.component.html',
  styleUrls: ['./operatives.component.scss']
})
export class OperativesComponent implements OnInit {
  Operatives : any = [];
  OperativesCount : string = "29";
  closeModal: string="";
  NewOperativeForm!: FormGroup;
  editOperativeForm!: FormGroup;
  newSubmitted = false;
  editSubmitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private dashboardService: DashboardService, private loginService: LoginService,private modalService: NgbModal) { 
    this.LoadData();
  }

  ngOnInit(): void {
    this.NewOperativeForm = this.formBuilder.group({ 
      firstName:	 ['', [Validators.required]], 
      lastName: ['', [Validators.required]],  
      Id:	 ['', [Validators.required]]  
    });
    
    this.editOperativeForm = this.formBuilder.group({ 
      firstName:	 ['', [Validators.required]], 
      lastName: ['', [Validators.required]],  
      Id:	 ['', [Validators.required]]  
    });
  }
  editTriggerModal(operative:any, id:any) {
    this.editOperativeForm = this.formBuilder.group({ 
      name:	 [operative.name, [Validators.required]], 
      description: [operative.description, [Validators.required]],  
      jobId:	 [operative.jobId, [Validators.required]]
    }); 
    this.modalService.open(id, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  newTriggerModal(id:any) {
    debugger
    this.modalService.open(id, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  onSubmitNewOperative() {
    debugger
    if (this.NewOperativeForm.valid) {
      // tslint:disable-next-line: max-line-length
      this.dashboardService.AddAsset(this._OperativesValue()).subscribe(() => { debugger;   });

    }
  }
  onSubmitEditOperative() {
    debugger
    if (this.editOperativeForm.valid) {
      // tslint:disable-next-line: max-line-length
      this.dashboardService.AddAsset(this._editOperativeValue()).subscribe(() => { debugger;   });

    }
  }
  _OperativesValue() {
    return this.NewOperativeForm.value;
  }
  
  _editOperativeValue() {
    return this.editOperativeForm.value;
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
      this.dashboardService.getJobs().subscribe((data) => { 
          debugger 
          this.Operatives=data;
          this.OperativesCount=this.Operatives.length;
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
