import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ConnectionService} from "./service/connection.service";
import {UserService} from "./service/user.service";
import {AuthComponent} from "./components/auth/auth.component";
import {AppRoutingModule} from "./module/app-routing.module";
import {CourseComponent} from "./components/course/course.component";
import {ProgramComponent} from './components/program/program.component';
import {CourseService} from './service/course.service';
import {ProgramService} from './service/program.service';
import {SearchLineComponent} from './components/search-line/search-line.component';
import {SearchService} from './service/search.service';
import {SearchComponent} from './components/search/search.component';
import {ProfessionalStandardService} from './service/professional-standard.service';
import {GraphViewComponent} from './components/graph-view/graph-view.component';
import {UserListComponent} from './components/users-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CourseComponent,
    ProgramComponent,
    SearchLineComponent,
    SearchComponent,
    GraphViewComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ConnectionService, UserService, CourseService, ProgramService, SearchService, ProfessionalStandardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
