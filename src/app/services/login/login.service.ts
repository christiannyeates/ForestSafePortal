import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticateModel } from 'src/app/core/models/authenticate-model';
import { AuthCookie } from 'src/app/core/utils/auth.cookie';
import { RepositoryService } from '../repository/repository.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private repositoryService: RepositoryService, private authCookie: AuthCookie
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(this.authCookie.getAuth()));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject;
    }

    login(authenticateModel: AuthenticateModel) {
        // return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
        return this.repositoryService.post('auth/login', authenticateModel)
            .pipe(map((user: any) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.authCookie.setAuth(JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        this.authCookie.deleteAuth();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

}
