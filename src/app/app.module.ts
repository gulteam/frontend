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
import {UserComponent} from './components/user/user.component';
import {NavigationPanelComponent} from './components/navigation-panel/navigation-panel.component';
import {AllProfessionalStandardComponent} from './components/all_professional_standart/all_professional_standart.component';
import {AllProfessionalStandardStatusComponent} from './components/all_professional_standart_status/all_professional_standart_status.component';
import {RolesService} from './service/roles.service';
import {FacultyService} from './service/faculty.service';
import {SkillsService} from './service/skills.service';
import {KnowledgeService} from './service/knowledge.service';
import {ProffesionalStandartComponent} from "./components/standart/standart.component";
import {ProfSearchComponent} from "./components/profSearch/prof_search.component";
import {ProfSearchService} from "./service/prof-search.service";
import {ProfSearchLineComponent} from "./components/prof-search-line/prof-search-line.component";
import {AnalyzeComponent} from './components/analyze/analyze.component';
import {ModalComponent} from './components/modal/modal.component';
import {StatusComponent} from './components/not-in-educational-for-standard/not-in-educational-for-standard.component';
import {ModalService} from './service/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CourseComponent,
    ProgramComponent,
    SearchLineComponent,
    SearchComponent,
    GraphViewComponent,
    UserListComponent,
    UserComponent,
    NavigationPanelComponent,
    AnalyzeComponent,
    ModalComponent,
    NavigationPanelComponent,
    AllProfessionalStandardComponent,
    ProffesionalStandartComponent,
    ProfSearchComponent,
    ProfSearchLineComponent,
    AllProfessionalStandardStatusComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ConnectionService,
    UserService,
    CourseService,
    ProgramService,
    SearchService,
    ProfessionalStandardService,
    RolesService,
    FacultyService,
    SkillsService,
    KnowledgeService,
    ModalService,
    KnowledgeService,
    ProfSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
