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
import {FacultyService} from '../../service/faculty.service';
import {Faculty} from '../../entity/faculty';
import {User} from '../../entity/user';
import {Competence} from '../../entity/competence';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  attestationForms: string[];

  allSkills: Skills[];
  allKnowledge: Knowledge[];
  allCourses: Course[];
  allUsers: User[];
  competences: Competence[];

  faculties: Faculty[];
  departments: Department[];

  noFaculty: boolean = true;
  noDepartment: boolean = true;

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private skillsService: SkillsService,
              private knowledgeService: KnowledgeService,
              private programService: ProgramService,
              private modalService: ModalService,
              private facultyService: FacultyService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(id).subscribe(course => {
      this.course = course;

      console.log(course);

      this.programService.getAllCoursesFromProgram(this.course.programId).subscribe(courses => {
        this.allCourses = courses;
      });

      this.facultyService.getAllFaculties().subscribe(faculties => {
        this.noFaculty = (this.course.faculty == null);

        if (!this.noFaculty) {
          this.course.faculty = faculties.find(faculty => this.course.faculty.id == faculty.id);
        }

        this.faculties = faculties;

        this.onFacultyChanged();
      });

      this.programService.getAllRequiredCompetences(course.programId).subscribe(competences=>{
        console.log(competences);
        this.competences = competences;
      });
    });

    this.skillsService.getAllSkills().subscribe(skills => {
      this.allSkills = skills;
    });

    this.knowledgeService.getAllKnowledge().subscribe(knowledge => {
      this.allKnowledge = knowledge;
    });

    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  save() {
    this.courseService.saveCourse(this.course).subscribe(message => {
      console.log('Course saved');
      console.log(message);
      this.location.back();
    });
  }

  delete() {
    this.courseService.deleteCourse(this.course.id).subscribe(message => {
      console.log('Course deleted');
      console.log(message);
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }

  getDevelopsSkills(): Skills[] {
    if (this.allSkills == null) {
      return null;
    }

    return this.allSkills.filter(skill =>
      this.course != null && this.course.developSkills.includes(skill.id)
    );
  }

  getDevelopsKnowledge(): Knowledge[] {
    if (this.allKnowledge == null) {
      return null;
    }

    return this.allKnowledge.filter(knowledge =>
      this.course != null && this.course.developKnowledge.includes(knowledge.id)
    );
  }

  removeSkill(skillToRemove: Skills) {
    this.course.developSkills = this.course.developSkills.filter(skills => skills != skillToRemove.id);
  }

  removeKnowledge(knowledgeToRemove: Knowledge) {
    this.course.developKnowledge = this.course.developKnowledge.filter(knowledge => knowledge != knowledgeToRemove.id);
  }

  getPossibleKnowledge(): Knowledge[] {
    if (this.allKnowledge == null) {
      return null;
    }

    return this.allKnowledge.filter(knowledge =>
      this.course != null && !this.course.developKnowledge.includes(knowledge.id)
    );
  }

  getPossibleSkills(): Skills[] {
    if (this.allSkills == null) {
      return null;
    }

    return this.allSkills.filter(skill =>
      this.course != null && !this.course.developSkills.includes(skill.id)
    );
  }

  addSkill(s: Skills) {
    this.course.developSkills.push(s.id);
  }

  addKnowledge(k: Knowledge) {
    this.course.developKnowledge.push(k.id);
  }

  getPreviousCources(): Course[] {
    if (this.allCourses == null) {
      return null;
    }

    return this.allCourses.filter(course =>
      this.course != null && this.course.previousCourses.includes(course.id)
    );
  }


  removeCourse(courseToRemove: Course) {
    this.course.previousCourses = this.course.previousCourses.filter(course => course != courseToRemove.id);
  }

  getNextCources(): Course[] {
    if (this.allCourses == null) {
      return null;
    }

    return this.allCourses.filter(course =>
      this.course != null && this.course.nextCourses.includes(course.id)
    );
  }

  getPossibleCources(): Course[] {
    if (this.allCourses == null) {
      return null;
    }

    return this.allCourses.filter(course =>
      this.course != null && !this.course.previousCourses.includes(course.id) && this.course.id != course.id
    );
  }

  addCourse(c: Course) {
    this.course.previousCourses.push(c.id);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  facultyStateChanged() {
    if (this.noFaculty) {
      this.course.faculty = null;

      this.noDepartment = true;
      this.departmentStateChanged();
    }
  }

  departmentStateChanged() {
    if (this.noDepartment) {
      this.course.department = null;
    }
  }

  onFacultyChanged() {
    let faculty = this.course.faculty;

    if (faculty == null) {
      this.departments = null;
    }
    else {
      this.facultyService.getAllDepartments(faculty.id).subscribe(departments => {
        this.noDepartment = (this.course.department == null);
        if (!this.noDepartment) {
          this.course.department = departments.find(department => this.course.department.id == department.id);
        }
        this.departments = departments;
      });
    }
  }

  getDevelopsBy(): User[] {
    if (this.course == null) {
      return null;
    }

    return this.allUsers.filter(user =>
      this.course != null && this.course.developedBy.includes(user.id)
    );
  }


  getPossibleDevelopsBy(): User[] {
    if (this.course == null) {
      return null;
    }

    return this.allUsers.filter(user =>
      this.course != null && !this.course.developedBy.includes(user.id)
    );
  }

  removeDevelopsBy(userToRemove: User) {
    this.course.previousCourses = this.course.developedBy.filter(user => user != userToRemove.id);
  }

  addDevelopsBy(u: User) {
    this.course.developedBy.push(u.id);
  }

  //--------------------------------------------------------------------------------------------------------------------------------------//

  getDevelopsCompetences(): Competence[] {
    if (this.competences == null) {
      return null;
    }

    return this.competences.filter(competence =>
      this.course != null && this.course.developCompetence.includes(competence.id)
    );
  }

  getPossibleCompetences(): Competence[] {
    if (this.competences == null) {
      return null;
    }

    return this.competences.filter(competence =>
      this.course != null && !this.course.developCompetence.includes(competence.id)
    );
  }

  removeCompetence(competenceToRemove: Competence) {
    this.course.developCompetence = this.course.developCompetence.filter(competence => competence != competenceToRemove.id);
  }

  addCompetence(competence: Competence){
    this.course.developCompetence.push(competence.id);
  }
}
