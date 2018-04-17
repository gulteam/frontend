import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {CourseService} from '../../service/course.service';
import {Course} from '../../entity/course';
import {Program} from '../../entity/program';
import {ProgramService} from '../../service/program.service';
import {ModalService} from '../../service/modal.service';

@Component({
  selector: 'app-test',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  courses: Map<Program, Course[]> = new Map();
  programs: Program[];

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private programService: ProgramService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.updateProgramList();
  }

  updateProgramList(){
    this.programService.getAllPrograms().subscribe(programs => {
      this.programs = programs;
      console.log('all programs: ');
      for(let program of programs){
        console.log(program);
        this.updateCourseList(program);
      }
    });
  }

  updateCourseList(program: Program) {
    this.programService.getAllCoursesFromProgram(program.id).subscribe(courses => {
      this.courses.set(program, courses);
    });
  }

  deleteProgram(program: Program) {
    this.programService.deleteProgram(program.id).subscribe(message => {
      this.updateProgramList();
    });
  }

  createCourse(program: Program) {
    this.programService.addCourseToProgram(program.id).subscribe(course => {
      this.updateCourseList(program);
    });
  }

  createProgram() {
    this.programService.addProgram().subscribe(program => {
      this.updateProgramList();
    });
  }

  courseClicked(course: Course) {
    this.router.navigate(['/course', course.id]);
  }

  gotoSearch(program: Program) {
    this.router.navigate(['/search', program.id]);
  }

  analyze(program: Program) {
    this.router.navigate(['/analyze', program.id]);
  }

  openModal(id: string){
    this.modalService.open(id);
  }

  closeModal(id: string){
    this.modalService.close(id);
  }
}
