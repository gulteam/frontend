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

@Component({
  selector: 'fgos',
  templateUrl: './fgos.component.html',
  styleUrls: ['./fgos.component.css']
})
export class FgosComponent implements OnInit {
  fgos: Fgos;

  constructor(private fgosService: FgosService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadFgos();
  }

  loadFgos(){
    let id = +this.route.snapshot.paramMap.get('id');

    this.fgosService.getFgos(id).subscribe(fgos => {
      this.fgos = fgos;
    });
  }

  save() {
    this.fgosService.saveFgos(this.fgos).subscribe(message=>{
      console.log('Fgos saved');
      this.location.back();
    });
  }

  delete() {
    this.fgosService.deleteFgos(this.fgos.id).subscribe(message => {
      console.log('Fgos deleted');
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }

  addCompetence() {
    this.fgosService.addCompetence(this.fgos.id).subscribe(message=>{
      this.loadFgos();
    });
  }

  editCompetence(competence: Competence) {
    this.router.navigate(['/competence', competence.id]);
  }

  addRequiredCourse() {
    this.fgosService.addReuiredCourse(this.fgos.id).subscribe(message=>{
      this.loadFgos();
    });
  }

  editRequiredCourse(requiredCourse: CourseRequirement) {
    this.router.navigate(['/courseRequirement', requiredCourse.id]);
  }
}
