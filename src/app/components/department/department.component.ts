import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Course} from '../../entity/course';
import {Location} from '@angular/common';
import {CourseService} from '../../service/course.service';
import {SkillsService} from '../../service/skills.service';
import {KnowledgeService} from '../../service/knowledge.service';
import {ProgramService} from '../../service/program.service';
import {ModalService} from '../../service/modal.service';
import {DepartmentService} from '../../service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department: Department;

  constructor(
              private departmentService: DepartmentService,
              private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private modalService: ModalService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.departmentService.getDepartment(id).subscribe(department => {
      this.department = department;

      console.log(department);
    });
  }

  save() {
    this.departmentService.saveDepartment(this.department).subscribe(message => {
      console.log('Department saved');
      console.log(message);
      this.location.back();
    });
  }

  delete() {
    this.departmentService.deleteDepartment(this.department.id).subscribe(message => {
      console.log('Department deleted');
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
