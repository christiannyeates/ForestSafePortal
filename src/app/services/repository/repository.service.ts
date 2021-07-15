import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public get = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.apiUrl));
  }

  public post = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }
  public postWithFile = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.apiUrl), body);
  }

  public put = (route: string, body: any) => {
    return this.http.put(this.createCompleteRoute(route, environment.apiUrl), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.apiUrl));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  private generateHeadersForFile = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
