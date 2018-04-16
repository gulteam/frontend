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

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private skillsService: SkillsService,
              private knowledgeService: KnowledgeService,
              private programService: ProgramService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(id).subscribe(course => {
      this.course = course;

      console.log(course);

      this.programService.getAllCoursesFromProgram(this.course.programId).subscribe(courses => {
        this.allCourses = courses;
      });
    });

    this.skillsService.getAllSkills().subscribe(skills => {
      this.allSkills = skills;
    });

    this.knowledgeService.getAllKnowledge().subscribe(knowledge => {
      this.allKnowledge = knowledge;
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
}
