import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) {
  }



  getMarkByDoctorId(id): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/mark/${id}`);
  }

  createMark(addedMark): Observable<APIResponse> {

    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/mark`, {mark: addedMark.mark, doctor: addedMark.doctor }, {headers});
  }
}
