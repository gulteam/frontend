import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {Course} from '../../entity/course';
import {Program} from '../../entity/program';
import {FacultyService} from '../../service/faculty.service';
import {ModalService} from '../../service/modal.service';

@Component({
  selector: 'app-test',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  departments: Map<Faculty, Department[]> = new Map();
  faculties: Faculty[];

  constructor(private facultyService: FacultyService,
              private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.updateFacultyList();
  }

  updateFacultyList() {
    this.facultyService.getAllFaculties().subscribe(faculties => {
      this.faculties = faculties;
      for (let faculty of faculties) {
        this.updateDepartmentsList(faculty);
      }
    });
  }

  updateDepartmentsList(faculty: Faculty) {
    this.facultyService.getAllDepartments(faculty.id).subscribe(departments => {
      this.departments.set(faculty, departments);
    });
  }

  deleteFaculty(faculty: Faculty) {
    this.facultyService.deleteFaculty(faculty.id).subscribe(message => {
      this.updateFacultyList();
    });
  }

  //----------------------------------------------------------------------------------------------//

  createDepartment(faculty: Faculty) {
    this.facultyService.addDepartmentToFaculty(faculty.id).subscribe(department => {
      this.updateDepartmentsList(faculty);
    });
  }

  createFaculty() {
    this.facultyService.addFaculty().subscribe(faculty => {
      this.updateFacultyList();
    });
  }

  /*courseClicked(course: Course) {
    this.router.navigate(['/course', course.id]);
  }

  gotoSearch(program: Program) {
    this.router.navigate(['/search', program.id]);
  }

  analyze(program: Program) {
    this.router.navigate(['/analyze', program.id]);
  }*/

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
