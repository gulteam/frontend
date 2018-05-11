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

@Component({
  selector: 'competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {
  competence: Competence;

  constructor(private competenceService: CompetenceService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadCompetence();
  }

  loadCompetence(){
    let id = +this.route.snapshot.paramMap.get('id');

    this.competenceService.getCompetence(id).subscribe(competence => {
      this.competence = competence;
    });
  }

  save() {
    this.competenceService.saveCompetence(this.competence).subscribe(message=>{
      console.log('Competence saved');
      this.location.back();
    });
  }

  delete() {
    this.competenceService.deleteCompetence(this.competence.id).subscribe(message => {
      console.log('Competence deleted');
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }
}
