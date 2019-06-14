import {Component, Input, OnInit} from '@angular/core';
import {APIResponse} from '../../Interfaces/API_Response';
import {MarkService} from '../../services/mark.service';
import {Mark} from '../../Interfaces/Mark';
import {DoctorService} from '../../services/doctor.service';
import {GetMark} from '../../Interfaces/GetMark';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {

  @Input() doctorId;

  constructor(
    private markService: MarkService,
    private doctorService: DoctorService,
  ) { }

  isUser: boolean;
  marks: GetMark = {count_voices: 0, average_mark: 0};
  addedMark: Mark = {mark: 0, count_voices: 1, doctor: 0};
  id = this.doctorService.idDoctor.value;



  ngOnInit() {
    this.getMarksByDoctor(this.id);
    this.isUserExist();
  }


  isUserExist(): void {
    this.isUser = !!localStorage.getItem('token');
  }

  getMarksByDoctor(id): void {
    this.markService.getMarkByDoctorId(id)
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.marks = response.message;
        }
        console.log(this.marks);
      });
  }

  vote(mark): void {
    if (this.isUser) {
      console.log(mark.contact);
      this.addedMark.mark = mark.contact;
      this.addedMark.doctor = this.doctorId;
      this.markService.createMark(this.addedMark)
        .subscribe((response: APIResponse) => {
          console.log(response.message);
        });
      this.getMarksByDoctor(this.id);
    }

  }
}
