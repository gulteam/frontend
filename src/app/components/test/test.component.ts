import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {CourseService} from '../../service/course.service';
import {Course} from '../../entity/course';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  courses: Course[];
  programId: number = 0;

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService) {
  }

  ngOnInit() {
    this.updateCourseList();
  }

  updateCourseList() {
    this.courseService.getAllCoursesFromProgram(this.programId).subscribe(courses => {
      this.courses = courses;
    });
  }

  create() {
    this.courseService.addCourse(this.programId).subscribe(course => {
      this.updateCourseList();
    });
  }

  courseClicked(course: Course) {
    this.router.navigate(['/program', this.programId, 'course', course.id]);
  }
}
