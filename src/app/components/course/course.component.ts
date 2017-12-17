import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Course} from "../../entity/course";
import {Location} from '@angular/common';
import {CourseService} from '../../service/course.service';
import {SkillsService} from '../../service/skills.service';
import {KnowledgeService} from '../../service/knowledge.service';

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

  selectedSkill: Skills;
  selectedKnowledge: Knowledge;

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private skillsService: SkillsService,
              private knowledgeService: KnowledgeService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.courseService.getCourse(id).subscribe(course=>{
      this.course = course;

      if(!this.course.developSkills){
        this.course.developSkills = [];
      }

      if(!this.course.developKnowledge){
        this.course.developKnowledge = [];
      }
    });

    this.skillsService.getAllSkills().subscribe(skills=>{
      this.allSkills = skills;
    });

    this.knowledgeService.getAllKnowledge().subscribe(knowledge=>{
      this.allKnowledge = knowledge;
    })
  }

  save(){
    this.courseService.saveCourse(this.course).subscribe(message=>{
      console.log('Course saved');
      this.location.back();
    });
  }

  delete(){
    this.courseService.deleteCourse(this.course.id).subscribe(message=>{
      console.log('Course deleted');
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
}
