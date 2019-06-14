import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  idDoctor = new BehaviorSubject<any>({id: null});

  getDoctorsBySection(section): Observable<APIResponse> {
    return  this.http.get<APIResponse>(`${Hosts.API_HOST}/api/doctor/section/${section}`);
  }

  getDoctorById(id): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/doctor/${id}`);
  }

  allDoctors(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/doctor`);
  }

  editDoctor(info, doctorId): Observable<APIResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.put<APIResponse>(`${Hosts.API_HOST}/api/doctor/${doctorId}`, {
      experience: info.experience,
      description: info.description,
      phone: info.phone,
      floor: info.floor,
      room_number: info.room_number,
      working_days: info.working_days},{headers});
  }

  getCurrentDoctor(): Observable<APIResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/doctor/current`, {headers});
  }

}
