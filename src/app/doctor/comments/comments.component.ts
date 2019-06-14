import { Component, OnInit } from '@angular/core';
import {APIResponse} from '../../Interfaces/API_Response';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../Interfaces/Comment';
import {UserService} from '../../services/user.service';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private doctorService: DoctorService
  ) { }

  User = true;
  UserId = localStorage.getItem('currentUser');
  comments: Comment[];
  idDoctor = this.doctorService.idDoctor.value;
  editCommentClc: boolean;
  commentId: Comment;

  isUser() {
    if (localStorage.getItem('currentUserCredentials') === '2') {
      this.User = false;
    }

  }

  editClc(comment): void {
    this.editCommentClc = !this.editCommentClc;
    this.commentId = comment;
    this.getComments(this.idDoctor);
  }

  getComments(id): void {
    this.commentService.getCommentByDoctorId(id)
      .subscribe((response: APIResponse) => {
        if (response.success) {
          this.comments = response.message;
        }
      });
  }

  deleteComment(comment): void {
    console.log(comment.author_id);
    console.log('////////////');
    if (comment.author_id == this.UserId) {
      this.commentService.deleteComment(comment.id)
        .subscribe((response: APIResponse) => {
          if (response.success) {alert('You delete this'); }
        });
      this.getComments(this.idDoctor);
    } else { alert('It is not your comment!'); }

  }

  createComment(comment): void {
    console.log(comment.commentText);
    this.commentService.createComment(comment.commentText, this.idDoctor)
      .subscribe((response: APIResponse) => {
        console.log(response.message);
        alert('Comment added');
      });
    this.getComments(this.idDoctor);
  }



  ngOnInit() {
    this.getComments(this.idDoctor);
    this.isUser();
  }

}
