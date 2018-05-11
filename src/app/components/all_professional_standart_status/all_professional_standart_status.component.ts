import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {ProfessionalStandard} from '../../entity/professional-standard';
import {ProfessionalStandardStatus} from '../../entity/professional-standard-status';
import {ProfessionalStandardService} from '../../service/professional-standard.service';

@Component({
  selector: 'app-course',
  templateUrl: './all_professional_standart_status.component.html',
  styleUrls: ['./all_professional_standart_status.component.css']
})
export class AllProfessionalStandardStatusComponent implements OnInit {
  professionalStandardStatuses: ProfessionalStandardStatus[];
  professionalStandardYES: ProfessionalStandard[];
  professionalStandardNO: ProfessionalStandard[];

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private professionalStandardService: ProfessionalStandardService) {
  }

  ngOnInit() {
    this.professionalStandardService.getAllProfessionalStandardStatus().subscribe(professionalStandardStatuses => {
      this.professionalStandardStatuses = professionalStandardStatuses;
      this.professionalStandardNO = [];
      this.professionalStandardYES = [];
      for (let i = 0; i < this.professionalStandardStatuses.length; ++i) {
        if (this.professionalStandardStatuses[i].status === "NO") {
          this.professionalStandardNO.push(this.professionalStandardStatuses[i].professionalStandard);
        } else {
          this.professionalStandardYES.push(this.professionalStandardStatuses[i].professionalStandard);
        }
      }
    });
  }



  professionalStandartClicked(professional_standart: ProfessionalStandard) {
    this.router.navigate(['/status', professional_standart.id]);
  }
}
