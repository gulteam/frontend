import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Fgos} from '../../entity/fgos';
import {FgosService} from '../../service/fgos.service';
import {Competence} from '../../entity/competence';
import {CourseRequirement} from '../../entity/course-requirement';
import {ProfessionalStandard} from '../../entity/professional-standard';
import {ProfessionalStandardService} from '../../service/professional-standard.service';
import {ModalService} from '../../service/modal.service';

@Component({
  selector: 'fgos',
  templateUrl: './fgos.component.html',
  styleUrls: ['./fgos.component.css']
})
export class FgosComponent implements OnInit {
  fgos: Fgos;
  allStandarts: ProfessionalStandard[];

  constructor(private fgosService: FgosService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private standardService: ProfessionalStandardService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.loadFgos();
  }

  loadFgos() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.fgosService.getFgos(id).subscribe(fgos => {
      this.fgos = fgos;
    });

    this.standardService.getAll().subscribe(standards => {
      console.log(standards);
      this.allStandarts = standards;
    });
  }

  save() {
    this.fgosService.saveFgos(this.fgos).subscribe(message => {
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
    this.fgosService.addCompetence(this.fgos.id).subscribe(message => {
      this.loadFgos();
    });
  }

  editCompetence(competence: Competence) {
    if(this.fgos.canUpdate) {
      this.router.navigate(['/competence', competence.id]);
    }
  }

  addRequiredCourse() {
    this.fgosService.addReuiredCourse(this.fgos.id).subscribe(message => {
      this.loadFgos();
    });
  }

  editRequiredCourse(requiredCourse: CourseRequirement) {
    if(this.fgos.canUpdate) {
      this.router.navigate(['/courseRequirement', requiredCourse.id]);
    }
  }

  removeProfStandard(profStandardToRemove: ProfessionalStandard) {
    this.fgos.professionalStandards = this.fgos.professionalStandards.filter(profStandard => profStandard.id != profStandardToRemove.id);
  }

  addCourse(p: ProfessionalStandard) {
    this.fgos.professionalStandards.push(p);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getPossibleProfStandards(): ProfessionalStandard[] {
    if (this.allStandarts == null || this.fgos == null) {
      return null;
    }

    return this.allStandarts.filter(standards => {
      for (let st of this.fgos.professionalStandards) {
        if(st.id == standards.id){
          return false;
        }
      }

      return true;
    });
  }

  addStandard(standard: ProfessionalStandard) {
    this.fgos.professionalStandards.push(standard);
  }
}
