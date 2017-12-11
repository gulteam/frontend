import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Course} from "../../entity/course";
import {Location} from '@angular/common';
import {CourseService} from '../../service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  attestationForms: string[];

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(id).subscribe(course=>{
      this.course = course;
    })
  }

  save(){
    this.courseService.saveCourse(this.course).subscribe(message=>{
      console.log('Course saved');
      this.location.back();
    });
  }

  delete(){
    this.courseService.deleteCourse(this.course.id).subscribe(message=>{
      console.log('Course deleted');
      this.location.back();
    });
  }

  cancel(){
    this.location.back();
  }
}
