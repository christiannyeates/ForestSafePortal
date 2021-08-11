import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    this.gotoDashboard();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    debugger
    if (this.loginForm.valid) {
      // tslint:disable-next-line: max-line-length
      this.loginService.login(this._v()).subscribe(() => {  this.router.navigateByUrl('/dashboard'); });

    }
  }
  gotoDashboard(){
    if(this.loginService.isLoggedIn == true){ this.router.navigateByUrl('/dashboard'); } 
  }
  _v() {
    return this.loginForm.value;
  }

}
