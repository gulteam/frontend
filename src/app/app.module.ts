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
import {TestComponent} from "./components/test/test.component";
import {CourseService} from './service/course.service';
import {ProgramService} from './service/program.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CourseComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ConnectionService, UserService, CourseService, ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
