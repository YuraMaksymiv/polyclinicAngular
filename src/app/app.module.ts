import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SectionsComponent } from './sections/sections.component';
import { SectionDoctorsComponent } from './section-doctors/section-doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import {RouterModule, Routes} from '@angular/router';
import { CommentsComponent } from './doctor/comments/comments.component';
import { MarksComponent } from './doctor/marks/marks.component';
import { CommentUpdateComponent } from './doctor/comments/comment-update/comment-update.component';

const routes: Routes = [
  {path: '', component: SectionsComponent},
  {path: 'doctor', component: DoctorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SectionsComponent,
    SectionDoctorsComponent,
    DoctorComponent,
    CommentsComponent,
    MarksComponent,
    CommentUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
