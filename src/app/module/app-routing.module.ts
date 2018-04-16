import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CourseComponent} from '../components/course/course.component';
import {ProgramComponent} from '../components/program/program.component';
import {SearchComponent} from '../components/search/search.component';
import {UserComponent} from '../components/user/user.component';
import {UserListComponent} from '../components/users-list/user-list.component';
import {AnalyzeComponent} from '../components/analyze/analyze.component';
import {FacultyComponent} from '../components/faculty/faculty.component';
import {DepartmentComponent} from '../components/department/department.component';

const routes: Routes = [
  {path: '', redirectTo: 'allPrograms', pathMatch: 'full'},
  {path: 'course/:id', component: CourseComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'search/:id', component: SearchComponent},
  {path: 'analyze/:id', component: AnalyzeComponent},
  {path: 'department/:id', component: DepartmentComponent},
  {path: 'allPrograms', component: ProgramComponent},
  {path: 'allUsers', component: UserListComponent},
  {path: 'allFaculties', component: FacultyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
