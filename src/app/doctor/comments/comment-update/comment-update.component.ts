import {Component, Input, OnInit} from '@angular/core';
import {APIResponse} from '../../../Interfaces/API_Response';
import {Comment} from '../../../Interfaces/Comment';
import {CommentService} from '../../../services/comment.service';
import {DoctorService} from '../../../services/doctor.service';

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit {

  @Input() commentInput;

  constructor(
    private commentService: CommentService,
    private doctorService: DoctorService
  ) { }

  User = true;
  UserId: number = +localStorage.getItem('currentUser');
  comments: Comment[];
  idDoctor = this.doctorService.idDoctor.value;

  getComments(id): void {
    this.commentService.getCommentByDoctorId(id)
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.comments = response.message;
        }
      });
  }

  editComment(comment, commentId): void {
    console.log(this.UserId);
    console.log('//////////');
    console.log(comment);
    if (this.commentInput.author_id === this.UserId) {
      this.commentService.editComment(this.commentInput.author_id, comment.commentText, commentId.id)
        .subscribe((response: APIResponse) => {
          if (response.success) { alert(`You edit your comment to ${response.message}`); }
        });
    } else {alert('This in not your comment'); }
  }

  ngOnInit() {
  }

}
