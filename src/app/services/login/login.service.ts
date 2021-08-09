import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticateModel } from 'src/app/core/models/authenticate-model'; 
import { RepositoryService } from '../repository/repository.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
 
    public user:  any;

    constructor(
        private router: Router,
        private repositoryService: RepositoryService  
    ) {
         
    }

    
    login(authenticateModel: AuthenticateModel) {
        return this.repositoryService.post('auth/login', authenticateModel,false)
            .pipe(map((user: any) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token', user.token)  
                return user;
            })); 
      }
      getToken() {
        return localStorage.getItem('access_token');
      }
    
      get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
      }
    
      doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
          this.router.navigate(['login']);
        }
      }
 
}
