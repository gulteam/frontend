import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {User} from '../../entity/user';
import {RolesService} from '../../service/roles.service';
import {FacultyService} from '../../service/faculty.service';
import {Faculty} from '../../entity/faculty';
import {Fgos} from '../../entity/fgos';
import {FgosService} from '../../service/fgos.service';
import {Competence} from '../../entity/competence';
import {CourseRequirement} from '../../entity/course-requirement';
import {CompetenceService} from '../../service/competence.service';
import {CourseRequirementService} from '../../service/course-requirement.service';

@Component({
  selector: 'courseRequirement',
  templateUrl: './course-requirement.component.html',
  styleUrls: ['./course-requirement.component.css']
})
export class CourseRequirementComponent implements OnInit {
  courseRequirement: CourseRequirement;

  constructor(private courseRequirementService: CourseRequirementService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadCourseRequirement();
  }

  loadCourseRequirement(){
    let id = +this.route.snapshot.paramMap.get('id');

    this.courseRequirementService.getCourseRequirement(id).subscribe(courseRequirement => {
      this.courseRequirement = courseRequirement;
    });
  }

  save() {
    this.courseRequirementService.saveCourseRequirement(this.courseRequirement).subscribe(message=>{
      console.log('CourseRequirement saved');
      this.location.back();
    });
  }

  delete() {
    this.courseRequirementService.deleteCourseRequirement(this.courseRequirement.id).subscribe(message => {
      console.log('CourseRequirement deleted');
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }
}
