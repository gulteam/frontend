import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Location} from '@angular/common';
import {User} from '../../entity/user';
import {RolesService} from '../../service/roles.service';
import {FacultyService} from '../../service/faculty.service';
import {Faculty} from '../../entity/faculty';
import {ProgramService} from '../../service/program.service';
import {Program} from '../../entity/program';
import {Fgos} from '../../entity/fgos';
import {FgosService} from '../../service/fgos.service';

@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  program: Program;
  allFgoses: Fgos[];

  constructor(private programService: ProgramService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private fgosService: FgosService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.programService.getProgram(id).subscribe(program => {
      console.log(program);
      this.program = program;

      this.fgosService.getAllFgoses().subscribe(fgoses=>{
        this.allFgoses = fgoses;
        for(let tempFgos of fgoses){
          if(tempFgos.id == this.program.fgos.id){
            this.program.fgos = tempFgos;
            break;
          }
        }
      })
    });
  }

  save() {
    this.programService.saveProgram(this.program).subscribe(message=>{
      console.log('Program saved');
      this.location.back();
    });
  }

  delete() {
    this.programService.deleteProgram(this.program.id).subscribe(message => {
      console.log('Program deleted');
      this.location.back();
    });
  }

  cancel() {
    this.location.back();
  }

  onFgosChanged() {

  }
}
