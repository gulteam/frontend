import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {User} from '../../entity/user';
import {Faculty} from '../../entity/faculty';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  stubFaculty: Faculty = new Faculty();
  users: Map<String, Map<String, User[]>> = new Map();

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.updateUserList();

    this.stubFaculty.id = -1;
    this.stubFaculty.name = 'Без факультета';
  }

  updateUserList() {
    this.userService.getAllUsers().subscribe(users => {
      for (let user of users) {
        let facultyName = this.stubFaculty.name;

        if (user.faculty != null) {
          facultyName = user.faculty.name;
        }

        if (!this.users.has(facultyName)) {
          this.users.set(facultyName, new Map());
        }

        let departmentName = "";
        if (user.department != null) {
          departmentName = user.department.name;
        }

        if (!this.users.get(facultyName).has(departmentName)) {
          this.users.get(facultyName).set(departmentName, []);
        }

        this.users.get(facultyName).get(departmentName).push(user);
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(message => {
      this.updateUserList();
    });
  }

  selectUser(user: User) {
    this.router.navigate(['/user', user.id]);
  }
}
