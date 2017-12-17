import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseComponent} from "../components/course/course.component";
import {TestComponent} from "../components/test/test.component";
import {SearchLineComponent} from '../components/search-line/search-line.component';
import {SearchComponent} from '../components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full'},
  { path: 'course/:id', component: CourseComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
