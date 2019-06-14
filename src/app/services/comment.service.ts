import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../Interfaces/API_Response';
import {Hosts} from '../enums/hosts';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getCommentByDoctorId(id): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${Hosts.API_HOST}/api/comment/${id}`);
  }

  deleteComment(id): Observable<APIResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.delete<APIResponse>(`${Hosts.API_HOST}/api/comment/${id}`, {headers});
  }

  createComment(commentText, doctorId): Observable<APIResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.post<APIResponse>(`${Hosts.API_HOST}/api/comment/`, {comment: commentText, doctor: doctorId},{headers});
  }

  editComment(commentAuthor, commentText, commentId): Observable<APIResponse> {
    const headers = new HttpHeaders()
      .set('Authorization', localStorage.getItem('token'));

    return this.http.put<APIResponse>(`${Hosts.API_HOST}/api/comment/${commentId}`, {author: commentAuthor, comment: commentText},{headers});
  }
}
