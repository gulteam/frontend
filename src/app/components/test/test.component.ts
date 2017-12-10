import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  create(){
    this.router.navigate(['/program', 0, 'course', 'new'])
  }
}
