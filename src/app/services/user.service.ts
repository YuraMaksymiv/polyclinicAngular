import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hosts} from '../enums/hosts';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  allUsers(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/user`);
  }

  getCurrentUser(): Observable<APIResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/user/current`, {headers});
  }


}
