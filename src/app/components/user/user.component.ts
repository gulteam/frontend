import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {User} from '../../entity/user';
import {RolesService} from '../../service/roles.service';
import {FacultyService} from '../../service/faculty.service';
import {Faculty} from '../../entity/faculty';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  roles: Role[];
  faculties: Faculty[];
  departments: Department[];

  noFaculty: boolean = true;
  noDepartment: boolean = true;

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private rolesService: RolesService,
              private facultyService: FacultyService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id).subscribe(user => {
      this.user = user;

      this.rolesService.getAllRoles().subscribe(roles =>{
        this.user.role = roles.find(role => this.user.role.id == role.id);
        this.roles = roles;
      });

      this.facultyService.getAllFaculties().subscribe(faculties =>{
        this.noFaculty = (this.user.faculty == null);

        if(!this.noFaculty) {
          this.user.faculty = faculties.find(faculty => this.user.faculty.id == faculty.id);
        }
        this.faculties = faculties;

        this.onFacultyChanged();
      });

    });
  }

  onFacultyChanged(){
    let faculty = this.user.faculty;

    if(faculty == null){
      this.departments = null;
    }
    else{
      this.facultyService.getAllDepartments(faculty.id).subscribe(departments =>{
        this.noDepartment = (this.user.department == null);
        if(!this.noDepartment) {
          this.user.department = departments.find(department => this.user.department.id == department.id);
        }
        this.departments = departments;
      })
    }
  }

  save() {
    this.userService.saveUser(this.user).subscribe(message=>{
      console.log('User saved');
      this.location.back();
    });
  }

  delete() {
    this.userService.deleteUser(this.user.id).subscribe(message => {
      console.log('User deleted');
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }

  facultyStateChanged() {
    if(this.noFaculty){
      this.user.faculty = null;

      this.noDepartment = true;
      this.departmentStateChanged();
    }
  }

  departmentStateChanged() {
    if(this.noDepartment){
      this.user.department = null;
    }
  }
}
