import { Component, OnInit } from '@angular/core';
import {APIResponse} from '../Interfaces/API_Response';
import {Section} from '../Interfaces/Section';
import {Doctor} from '../Interfaces/Doctor';
import {SectionService} from '../services/section.service';
import {DoctorService} from '../services/doctor.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  constructor(
    private sectionService: SectionService,
    private doctorService: DoctorService
  ) { }

  sections: Section[];
  doctors: Doctor[];


  getSections(): void {
    this.sectionService.getSection()
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.sections = response.message;
        }
      });
  }



  getDoctorsBySections(section): void {
    this.doctorService.getDoctorsBySection(section)
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.doctors = response.message;
          console.log(this.doctors);
        }
      });
  }

  // showDoctors(sectionId): void {
  //   this.getDoctorsBySections(sectionId);
  // }

  ngOnInit() {
    this.getSections();
  }
}
