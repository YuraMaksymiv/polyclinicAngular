import {Component, Input, OnInit} from '@angular/core';
import {APIResponse} from '../Interfaces/API_Response';
import {DoctorService} from '../services/doctor.service';
import {Doctor} from '../Interfaces/Doctor';
import {Section} from '../Interfaces/Section';
import {SectionService} from '../services/section.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  @Input() idDoctor;

  constructor(
    private doctorService: DoctorService,
    private sectionService: SectionService
  ) {
  }


  doctor: Doctor;
  sections: Section[];
  id = localStorage.getItem('idDoctor');
  isUser = !!localStorage.getItem('token');
  idUser = localStorage.getItem('currentUser');
  isEditClick: boolean;
  canEdit: boolean;
  editDoctorData = {
    experience: ' ',
    description: ' ',
    phone: ' ',
    floor: 0,
    room_number: 0,
    working_days: ' '
  };


  edit(): void {
    this.editDoctorData.experience = this.doctor.experience;
    this.editDoctorData.description = this.doctor.description;
    this.editDoctorData.phone = this.doctor.phone;
    this.editDoctorData.floor = this.doctor.floor;
    this.editDoctorData.room_number = this.doctor.room_number;
    this.editDoctorData.working_days = this.doctor.working_days;
  }

  isUserDoctor() {
    if (this.idUser == this.id) {
      this.canEdit = true;
    } else {this.canEdit = false; }
  }

  editClc(): void {
    this.edit();
    this.isEditClick = !this.isEditClick;
    this.getSections();
  }

  getDoctorById(id): void {
    this.doctorService.getDoctorById(id)
      .subscribe((response: APIResponse) => {
        if (response.success) {
          [this.doctor] = response.message;
        }
      });

  }


  getSections(): void {
    this.sectionService.getSection()
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.sections = response.message;
        }
      });
  }

  editDoctor(id): void {
    this.doctorService.editDoctor(this.editDoctorData, id)
      .subscribe((response: APIResponse) => {
        if (response.success) {
          alert('Done');
        }
        this.getDoctorById(this.id);
      });

  }

  ngOnInit() {
    this.getDoctorById(this.id);
    this.isUserDoctor();
    this.isUserDoctor();
  }
}
