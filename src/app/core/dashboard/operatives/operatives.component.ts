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
  OperativesCount : string = "0";
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
      Email:	 ['', [Validators.required]],
      Password:	 ['', [Validators.required]],
      Role:['Driver',[Validators.required]]

    }); 
  }
  editTriggerModal(operative:any, id:any) {
    this.editOperativeForm = this.formBuilder.group({ 
      firstName:	 [operative.firstName, [Validators.required]], 
      lastName: [operative.lastName, [Validators.required]],  
      operativeId:	 [operative.operativeId, [Validators.required]]
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
  
  onSubmitNewOperative() { 
    debugger
    if (this.NewOperativeForm.valid) { 
      this.loginService.Register(this._OperativesValue()).subscribe(() => { 
        window.location.reload();
       }); 
    }
  }
  onSubmitEditOperative() { 
    if (this.editOperativeForm.valid) { 
      this.dashboardService.UpdateOperative(this._editOperativeValue()).subscribe(() => { 
        window.location.reload();
        });

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
      this.dashboardService.getAllOperatives().subscribe((data) => {   
          this.Operatives=data;
          this.OperativesCount=this.Operatives.length;
        }, (error) => { 
          if(error.status==401){
            this.loginService.doLogout();
            this.router.navigateByUrl('/'); 
          }
          console.log("Error in getAllOperatives: " + error.message);
        }); 
  } 

}
