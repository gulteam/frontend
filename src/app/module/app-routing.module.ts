import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseComponent} from '../components/course/course.component';
import {ProgramListComponent} from '../components/program-list/program-list.component';
import {SearchComponent} from '../components/search/search.component';
import {UserComponent} from '../components/user/user.component';
import {UserListComponent} from '../components/users-list/user-list.component';
import {AllProfessionalStandardComponent} from '../components/all_professional_standart/all_professional_standart.component';
import {ProffesionalStandartComponent} from "../components/standart/standart.component";
import {ProfSearchComponent} from "../components/profSearch/prof_search.component";
import {AnalyzeComponent} from '../components/analyze/analyze.component';
import {AllProfessionalStandardStatusComponent}from '../components/all_professional_standart_status/all_professional_standart_status.component';
import {StatusComponent} from '../components/not-in-educational-for-standard/not-in-educational-for-standard.component';
import {FacultiesComponent} from '../components/faculties/faculties.component';
import {DepartmentComponent} from '../components/department/department.component';
import {FacultyComponent} from '../components/faculty/faculty.component';
import {BlockComponent} from '../components/block/block.component';
import {ProgramComponent} from '../components/program/program.component';
import {FgosListComponent} from '../components/fgos-list/fgos-list.component';
import {FgosComponent} from '../components/fgos/fgos.component';
import {CompetenceComponent} from '../components/competence/competence.component';
import {CourseRequirementComponent} from '../components/course-requirement/course-requirement.component';

const routes: Routes = [
  {path: '', redirectTo: 'allPrograms', pathMatch: 'full'},
  {path: 'course/:id', component: CourseComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'program/:id', component: ProgramComponent},
  {path: 'search/:id', component: SearchComponent},
  {path: 'analyze/:id', component: AnalyzeComponent},
  {path: 'standart/:id', component: ProffesionalStandartComponent},
  {path: 'status/:id', component: StatusComponent},
  {path: 'allPrograms', component: ProgramComponent},
  {path: 'allUsers', component: UserListComponent},
  {path: 'allProfessionalStandarts', component: AllProfessionalStandardComponent},
  {path: 'profSearch', component: ProfSearchComponent},
  {path: 'allProfessionalStandartStatuses', component: AllProfessionalStandardStatusComponent},
  {path: 'department/:id', component: DepartmentComponent},
  {path: 'faculty/:id', component: FacultyComponent},
  {path: 'block/:id', component: BlockComponent},
  {path: 'fgos/:id', component: FgosComponent},
  {path: 'competence/:id', component: CompetenceComponent},
  {path: 'courseRequirement/:id', component: CourseRequirementComponent},
  {path: 'allPrograms', component: ProgramListComponent},
  {path: 'allUsers', component: UserListComponent},
  {path: 'fgosList', component: FgosListComponent},
  {path: 'allFaculties', component: FacultiesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
