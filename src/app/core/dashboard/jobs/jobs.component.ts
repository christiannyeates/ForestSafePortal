import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'; 
import { AssetModel } from '../../models/asset-model'; 
import { LoginService } from 'src/app/services/login/login.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  Jobs : any = [];
  jobsCount : string = "29";
  closeModal: string="";
  NewJobForm!: FormGroup;
  editJobForm!: FormGroup;
  newSubmitted = false;
  editSubmitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private dashboardService: DashboardService, private loginService: LoginService,private modalService: NgbModal) {
    this.LoadData();
   }

  ngOnInit(): void {
    this.NewJobForm = this.formBuilder.group({ 
      name:	 ['', [Validators.required]], 
      description: ['', [Validators.required]],  
      jobId:	 ['', [Validators.required]]  
    });
    
    this.editJobForm = this.formBuilder.group({ 
      name:	 ['', [Validators.required]], 
      description: ['', [Validators.required]],  
      jobId:	 ['', [Validators.required]]  
    });
  }
  editTriggerModal(job:any, id:any) {
    this.editJobForm = this.formBuilder.group({ 
      name:	 [job.name, [Validators.required]], 
      description: [job.description, [Validators.required]],  
      jobId:	 [job.jobId, [Validators.required]]
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
  
  onSubmitNewJob() { 
    if (this.NewJobForm.valid) { 
      this.dashboardService.AddJob(this._JobValue()).subscribe(() => { debugger;   });

    }
  }
  onSubmitEditJob() { 
    if (this.editJobForm.valid) { 
      //TO Do: API not added yet
      //this.dashboardService.addAsset(this._editJobValue()).subscribe(() => { debugger;   });

    }
  }
  _JobValue() {
    return this.NewJobForm.value;
  }
  
  _editJobValue() {
    return this.editJobForm.value;
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
          this.Jobs=data;
          this.jobsCount=this.Jobs.length;
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
