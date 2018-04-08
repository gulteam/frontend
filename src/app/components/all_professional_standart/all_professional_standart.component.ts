import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Location} from '@angular/common';
import {ProfessionalStandard} from "../../entity/professional-standard"
import {ProfessionalStandardService} from '../../service/professional-standard.service';

@Component({
  selector: 'app-course',
  templateUrl: './all_professional_standart.component.html',
  styleUrls: ['./all_professional_standart.component.css']
})
export class AllProfessionalStandardComponent implements OnInit {
  professionalStandards: ProfessionalStandard[];

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private professionalStandardService: ProfessionalStandardService) {
  }

  ngOnInit() {
    this.updateProfessionalStandartList();
  }

  updateProfessionalStandartList(){
    this.professionalStandardService.getAll().subscribe(professionalStandards => {
      this.professionalStandards = professionalStandards;
    });
  }


  professionalStandartClicked(professional_standart: ProfessionalStandard) {
    this.router.navigate(['/standart', professional_standart.id]);
  }

  gotoProfSearch(){
    this.router.navigate(['/profSearch']);
  }
}
