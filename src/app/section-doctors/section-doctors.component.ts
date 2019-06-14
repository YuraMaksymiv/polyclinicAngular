import {Component, Input, OnInit} from '@angular/core';
import {DoctorService} from '../services/doctor.service';


@Component({
  selector: 'app-section-doctors',
  templateUrl: './section-doctors.component.html',
  styleUrls: ['./section-doctors.component.css']
})
export class SectionDoctorsComponent implements OnInit {

  @Input() doctorInput;

  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit() {

  }

  getIdDoctor(idDoc): void {
    console.log(idDoc);
    this.doctorService.idDoctor.next(idDoc);
    console.log(this.doctorService.idDoctor);
    localStorage.setItem('idDoctor', idDoc);
  }

}
