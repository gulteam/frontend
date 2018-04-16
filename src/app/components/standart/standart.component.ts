import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Course} from "../../entity/course";
import {Location} from '@angular/common';
import {ProfessionalStandard} from "../../entity/professional-standard"
import {ProfessionalStandardService} from '../../service/professional-standard.service';
import {SkillsService} from '../../service/skills.service';
import {KnowledgeService} from '../../service/knowledge.service';

@Component({
  selector: 'app-course',
  templateUrl: './standart.component.html',
  styleUrls: ['./standart.component.css']
})
export class ProffesionalStandartComponent implements OnInit {
  professionalStandard: ProfessionalStandard;
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
              private professionalStandardService: ProfessionalStandardService,
              private skillsService: SkillsService,
              private knowledgeService: KnowledgeService) {
  }

  ngOnInit() {
    let id = + this.route.snapshot.paramMap.get('id');

    this.professionalStandardService.getProfessionalStandard(id).subscribe(professionalStandard=>{
      this.professionalStandard = professionalStandard;

      console.log(professionalStandard);

      this.professionalStandardService.getSkillsByProfessionalStandardId(this.professionalStandard.id).subscribe(allSkills => {
        this.allSkills = allSkills;
      });

      this.professionalStandardService.getKnowledgesByProfessionalStandardId(this.professionalStandard.id).subscribe(allKnowledge => {
        this.allKnowledge = allKnowledge;
      });
    });
  }
}
