import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {User} from '../../entity/user';
import {Faculty} from '../../entity/faculty';
import {Fgos} from '../../entity/fgos';
import {FgosService} from '../../service/fgos.service';

@Component({
  selector: 'app-fgos-list',
  templateUrl: './fgos-list.component.html',
  styleUrls: ['./fgos-list.component.css']
})
export class FgosListComponent implements OnInit {
  fgosList: Fgos[];
  userService_: UserService;

  constructor(private fgosService: FgosService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.userService_ = userService;
  }

  ngOnInit() {
    this.updateUserList();
  }

  updateUserList() {
    this.fgosService.getAllFgoses().subscribe(fgosList => {
      this.fgosList = fgosList;
    });
  }

  selectFgos(fgos: Fgos) {
    this.router.navigate(['/fgos', fgos.id]);
  }

  addFgos() {
    this.fgosService.create().subscribe(a => {
      this.updateUserList();
    });
  }
}
