import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseComponent} from '../components/course/course.component';
import {ProgramComponent} from '../components/program/program.component';
import {SearchComponent} from '../components/search/search.component';
import {UserComponent} from '../components/user/user.component';
import {UserListComponent} from '../components/users-list/user-list.component';
import {AllProfessionalStandardComponent} from '../components/all_professional_standart/all_professional_standart.component';
import {ProffesionalStandartComponent} from "../components/standart/standart.component";
import {ProfSearchComponent} from "../components/profSearch/prof_search.component";
import {AnalyzeComponent} from '../components/analyze/analyze.component';

const routes: Routes = [
  {path: '', redirectTo: 'allPrograms', pathMatch: 'full'},
  {path: 'course/:id', component: CourseComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'search/:id', component: SearchComponent},
  {path: 'analyze/:id', component: AnalyzeComponent},
  {path: 'standart/:id', component: ProffesionalStandartComponent},
  {path: 'allPrograms', component: ProgramComponent},
  {path: 'allUsers', component: UserListComponent},
  {path: 'allProfessionalStandarts', component: AllProfessionalStandardComponent},
  {path: 'profSearch', component: ProfSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
