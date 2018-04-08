import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProfSearchService} from "../../service/prof-search.service";
import {ProfessionalStandard} from "../../entity/professional-standard";

@Component({
  selector: 'app-search',
  templateUrl: './prof_search.component.html',
  styleUrls: ['./prof_search.component.css']
})
export class ProfSearchComponent implements OnInit {

  constructor(private profSearchService: ProfSearchService, private router: Router) {
  }

  ngOnInit() {
    this.profSearchService.startSearch();
  }

  getProfessionalStandarts(): ProfessionalStandard[] {
    return this.profSearchService.getProfessionalStandards();
  }

  professionalStandartClicked(professional_standart: ProfessionalStandard) {
    this.router.navigate(['/standart', professional_standart.id]);
  }
}
