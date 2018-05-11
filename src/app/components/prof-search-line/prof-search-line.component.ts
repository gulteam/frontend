import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../service/search.service';
import {Variant} from '../../entity/variant';
import {ProfSearchService} from "../../service/prof-search.service";

@Component({
  selector: 'app-prof-search-line',
  templateUrl: './prof-search-line.component.html',
  styleUrls: ['./prof-search-line.component.css']
})
export class ProfSearchLineComponent implements OnInit {
  request: string;

  constructor(private profSearchService: ProfSearchService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onSearchChange(value: string) {
    this.profSearchService.requestLineChanged(value);
  }

  getVariants(): Variant[] {
    return this.profSearchService.getPossibleVariants();
  }

  addPositive(variant: Variant) {
    this.profSearchService.addPositive(variant);
  }

  removePositive(variant: Variant) {
    this.profSearchService.removePositive(variant);
  }

  showInfo(variant: String) {
    console.log(variant);
  }

  getPositiveVariants(): Variant[] {
    return this.profSearchService.getPositiveVariants();
  }
}
