import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../../service/search.service';
import {Variant} from '../../entity/variant';

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.css']
})
export class SearchLineComponent implements OnInit {
  request: string;
  @ViewChild('searchLine') searchLine: any;

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.searchService.startSearchOnProgram(id);
  }

  onClick() {
    this.searchService.requestEmptyLine();
  }

  onFocusOut(event) {
    console.log(event.relatedTarget);

    if (event.relatedTarget == null) {
      this.searchService.clearRequest();
      return;
    }

    console.log(event.relatedTarget.classList);

    if (event.relatedTarget.classList.contains('option') ||
      event.relatedTarget.classList.contains('value')) {
      return;
    }

    this.searchService.clearRequest();
  }

  onSearchChange(value: string) {
    this.searchService.requestLineChanged(value);
  }

  getVariants(): Variant[] {
    return this.searchService.getPossibleVariants();
  }

  addNegative(variant: Variant) {
    this.searchLine.nativeElement.focus();
    this.searchService.addNegative(variant);
  }
  addPositive(variant: Variant) {
    this.searchLine.nativeElement.focus();
    this.searchService.addPositive(variant);
  }

  removeNegative(variant: Variant) {
    this.searchService.removeNegative(variant);
  }

  removePositive(variant: Variant) {
    this.searchService.removePositive(variant);
  }

  showInfo(variant: String) {
    console.log(variant);
  }

  getNegativeVariants(): Variant[] {
    return this.searchService.getNegativeVariants();
  }

  getPositiveVariants(): Variant[] {
    return this.searchService.getPositiveVariants();
  }
}
