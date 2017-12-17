import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Course} from "../../entity/course";
import {Location} from '@angular/common';
import {CourseService} from '../../service/course.service';
import {SkillsService} from '../../service/skills.service';
import {KnowledgeService} from '../../service/knowledge.service';
import {ProgramService} from '../../service/program.service';

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

  selectedSkill: Skills;
  selectedKnowledge: Knowledge;
  selectedCourse: Course;

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private skillsService: SkillsService,
              private knowledgeService: KnowledgeService,
              private programService: ProgramService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(id).subscribe(course=>{
      this.course = course;

      console.log(course);

      this.programService.getAllCoursesFromProgram(this.course.programId).subscribe(courses => {
        this.allCourses = courses
      });
    });

    this.skillsService.getAllSkills().subscribe(skills=>{
      this.allSkills = skills;
    });

    this.knowledgeService.getAllKnowledge().subscribe(knowledge=>{
      this.allKnowledge = knowledge;
    });
  }

  save(){
    this.courseService.saveCourse(this.course).subscribe(message=>{
      console.log('Course saved');
      console.log(message);
      this.location.back();
    });
  }

  delete(){
    this.courseService.deleteCourse(this.course.id).subscribe(message=>{
      console.log('Course deleted');
      console.log(message);
      this.location.back();
    });
  }

  cancel(){
    this.location.back();
  }

  getDevelopsSkills(): Skills[] {
    return this.allSkills.filter(skill =>
      this.course.developSkills.includes(skill.id)
    );
  }

  getDevelopsKnowledge(): Knowledge[] {
    return this.allKnowledge.filter(knowledge =>
      this.course.developKnowledge.includes(knowledge.id)
    );
  }

  removeSkill(skillToRemove: Skills) {
    this.course.developSkills = this.course.developSkills.filter(skills => skills != skillToRemove.id);
  }

  removeKnowledge(knowledgeToRemove: Knowledge) {
    this.course.developKnowledge = this.course.developKnowledge.filter(knowledge => knowledge!= knowledgeToRemove.id);
  }

  getPossibleKnowledge(): Knowledge[] {
    return this.allKnowledge.filter(knowledge =>
      !this.course.developKnowledge.includes(knowledge.id)
    );
  }

  getPossibleSkills(): Skills[] {
    return this.allSkills.filter(skill =>
      !this.course.developSkills.includes(skill.id)
    );
  }

  addSkill() {
    this.course.developSkills.push(this.selectedSkill.id);
    this.selectedSkill = null;
  }

  addKnowledge() {
    this.course.developKnowledge.push(this.selectedKnowledge.id);
    this.selectedKnowledge = null;
  }

  getPreviousCources(): Course[] {
    return this.allCourses.filter(course =>
      this.course.previousCourses.includes(course.id)
    );
  }


  removeCourse(courseToRemove: Course) {
    this.course.previousCourses = this.course.previousCourses.filter(course => course != courseToRemove.id);
  }

  getNextCources(): Course[] {
    return this.allCourses.filter(course =>
      this.course.nextCourses.includes(course.id)
    );
  }

  getPossibleCources(): Course[] {
    return this.allCourses.filter(course =>
      !this.course.previousCourses.includes(course.id) && this.course.id != course.id
    );
  }

  addCourse() {
    this.course.previousCourses.push(this.selectedCourse.id);
    this.selectedCourse = null;
  }
}
