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
import {ProgramListComponent} from './components/program-list/program-list.component';
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
import {RolesService} from './service/roles.service';
import {FacultyService} from './service/faculty.service';
import {SkillsService} from './service/skills.service';
import {KnowledgeService} from './service/knowledge.service';
import {AnalyzeComponent} from './components/analyze/analyze.component';
import {ModalComponent} from './components/modal/modal.component';
import {ModalService} from './service/modal.service';
import {FacultiesComponent} from './components/faculties/faculties.component';
import {DepartmentComponent} from './components/department/department.component';
import {DepartmentService} from './service/department.service';
import {FacultyComponent} from './components/faculty/faculty.component';
import {BlockComponent} from './components/block/block.component';
import {BlockService} from './service/block.service';
import {FgosService} from './service/fgos.service';
import {ProgramComponent} from './components/program/program.component';
import {FgosListComponent} from './components/fgos-list/fgos-list.component';
import {FgosComponent} from './components/fgos/fgos.component';
import {CompetenceService} from './service/competence.service';
import {CourseRequirementService} from './service/course-requirement.service';
import {CourseRequirementComponent} from './components/course-requirement/course-requirement.component';
import {CompetenceComponent} from './components/competence/competence.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CourseComponent,
    ProgramListComponent,
    SearchLineComponent,
    SearchComponent,
    GraphViewComponent,
    UserListComponent,
    UserComponent,
    NavigationPanelComponent,
    AnalyzeComponent,
    ModalComponent,
    FacultiesComponent,
    DepartmentComponent,
    FacultyComponent,
    BlockComponent,
    ProgramComponent,
    FgosListComponent,
    FgosComponent,
    CompetenceComponent,
    CourseRequirementComponent
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
    DepartmentService,
    BlockService,
    FgosService,
    CompetenceService,
    CourseRequirementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
