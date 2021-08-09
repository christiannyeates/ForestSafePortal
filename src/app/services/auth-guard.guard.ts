import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router ,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLoggedIn !== true) {
        window.alert("Access not allowed!");
        this.router.navigate(['/'])
      }
      return true;
  }
  


  
}
