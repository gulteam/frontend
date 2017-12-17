import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchService} from '../../service/search.service';
import {Trajectory} from '../../entity/Trajectory';
import {Course} from '../../entity/course';
import {Router} from '@angular/router';
import {GraphViewComponent} from '../graph-view/graph-view.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('graphView')
  graphViewRef: ElementRef;
  graphViewComponent: GraphViewComponent;

  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if(this.graphViewRef instanceof GraphViewComponent) {
      this.graphViewComponent = <GraphViewComponent> this.graphViewRef;
      this.searchService.subscribe(trajectories=>{
        this.graphViewComponent.setTrajectories(trajectories);
      })
    }
  }

  getTrajectories(): Trajectory[] {
    return this.searchService.getTrajectories();
  }

  courseClicked(course: Course) {
    this.router.navigate(['/course', course.id]);
  }

  trajectoryClicked(trajectory: Trajectory) {
    this.graphViewComponent.setSelectedTrajectory(trajectory);
  }
}
