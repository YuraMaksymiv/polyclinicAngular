import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hosts} from '../enums/hosts';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  loginUser(user): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user/login`, {email: user.email, password: user.password});
  }

  loginDoctor(doctor): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/doctor/login`, {email: doctor.email, password: doctor.password});
  }


  registerUser(user): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/user/register`, {
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname
    });
  }

  registerDoctor(doctor): Observable<APIResponse> {
    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/doctor/register`, {
      email: doctor.email,
      password: doctor.password,
      name: doctor.name,
      surname: doctor.surname
    });
  }
}
