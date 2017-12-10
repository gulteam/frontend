import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseComponent} from "../components/course/course.component";
import {TestComponent} from "../components/test/test.component";

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full'},
  { path: 'program/:programId/course/:id', component: CourseComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
