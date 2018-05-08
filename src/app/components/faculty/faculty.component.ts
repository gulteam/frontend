import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {ModalService} from '../../service/modal.service';
import {FacultyService} from '../../service/faculty.service';
import {Faculty} from '../../entity/faculty';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculty: Faculty;

  constructor(private facultyService: FacultyService,
              private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private modalService: ModalService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.facultyService.getFaculty(id).subscribe(faculty => {
      this.faculty = faculty;

      console.log(faculty);
    });
  }

  save() {
    this.facultyService.saveFaculty(this.faculty).subscribe(message => {
      console.log('Faculty saved');
      console.log(message);
      this.location.back();
    });
  }

  delete() {
    this.facultyService.deleteFaculty(this.faculty.id).subscribe(message => {
      console.log('Faculty deleted');
      console.log(message);
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
