import { Component, OnInit } from '@angular/core';
import {AuthService} from './services/auth.service';
import {APIResponse} from './Interfaces/API_Response';
import {UserService} from './services/user.service';
import {DoctorService} from './services/doctor.service';
import {Doctor} from './Interfaces/Doctor';
import {Section} from './Interfaces/Section';
import {SectionService} from './services/section.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private doctorService: DoctorService,
    private sectionService: SectionService) {
  }

  sections: Section[];
  isLoginClicked: boolean;
  isRegisterClicked: boolean;
  isTokenPresent: any;
  isLogoutClicked: boolean;
  doctors: Doctor[];
  constantDoctors: Doctor[];
  foundDoctors = [];



  loginClc() {
    this.isLoginClicked = !this.isLoginClicked;
    this.isRegisterClicked = false;
    this.isLogoutClicked = false;
    this.ngOnInit();
  }

  registerClc() {
    this.isRegisterClicked = !this.isRegisterClicked;
    this.isLoginClicked = false;
    this.isLogoutClicked = false;
    this.ngOnInit();
  }

  logoutClc() {
    this.isRegisterClicked = false;
    this.isLoginClicked = false;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserCredentials');
    this.ngOnInit();
  }

  getSections(): void {
    this.sectionService.getSection()
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.sections = response.message;
        }
      });
  }

  register(registerForm) {
    this.getSections();
    console.log(registerForm);
    if (registerForm.credentials === '1') {
      this.authService.registerUser(registerForm).subscribe((data: APIResponse) => {
        if (data.message) {
          alert(data.message);
        } else {alert(data.message); }
      });
    } else if (registerForm.credentials === '2') {
      this.authService.registerDoctor(registerForm).subscribe((data: APIResponse) => {
        if (data.message) {
          alert(data.message);
        } else {alert(data.message); }
      });
    }
    this.isRegisterClicked = false;
  }

  login(loginForm) {
    console.log(loginForm);
    if (loginForm.credentials === '1') {
      this.authService.loginUser(loginForm).subscribe((data: APIResponse) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.message);
          console.log(data.message);
          this.isTokenPresent = true;
          this.currentUser(1);
        } else if (data.success === false) {
          alert(data.message); }
      });
    } else if (loginForm.credentials === '2') {
      this.authService.loginDoctor(loginForm).subscribe((data: APIResponse) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.message);
          console.log(data.message);
          this.isTokenPresent = true;
          this.currentUser(2);
        } else if (data.success === false) {
          alert(data.message); }
      });
    }
    this.isLoginClicked = false;
  }

  currentUser(credentials) {
    if (credentials === 1) {
      this.userService.getCurrentUser()
        .subscribe((res: APIResponse) => {
          if (res.success) {
            console.log(res.message);
            localStorage.setItem('currentUser', res.message[0].id);
            localStorage.setItem('currentUserCredentials', res.message[0].credentials);
          }
        });
    } else if (credentials === 2) {
      console.log(credentials);
      this.doctorService.getCurrentDoctor()
        .subscribe((res: APIResponse) => {
          if (res.success) {
            console.log(res.message);
            localStorage.setItem('currentUser', res.message[0].id);
            localStorage.setItem('currentUserCredentials', res.message[0].credentials);
          }
        });
    }
  }

  getDoctors(): void {
    this.doctorService.allDoctors()
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.doctors = response.message;
          this.constantDoctors = this.doctors;
        }
      });
  }

  searchDoctors(inputName: string) {
    this.doctors = this.constantDoctors;
    this.foundDoctors = [];
    this.doctors.forEach((doctor) => {
      if (doctor.name.startsWith(inputName)) {
        this.foundDoctors.push(doctor);
      }
    });
    this.doctors = this.foundDoctors;
  }

  setDoctor(id) {
    localStorage.setItem('idDoctor', id)
    location.reload();;
  }

  ngOnInit(): void {
    this.isTokenPresent = localStorage.getItem('token');
    this.getSections();
    this.getDoctors();
  }
}
