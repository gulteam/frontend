import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Course} from '../../entity/course';
import {Location} from '@angular/common';
import {ModalService} from '../../service/modal.service';
import {User} from '../../entity/user';
import {Block} from '../../entity/block';
import {BlockService} from '../../service/block.service';

@Component({
  selector: 'app-course',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  block: Block;
  attestationForms: string[] = ['EXAM', 'CREDIT', 'DIFFERENTATED_CREDIT'];

  constructor(private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private blockService: BlockService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.blockService.getBlock(id).subscribe(block => {
      this.block = block;

      console.log(block);
    });
  }

  save() {
    this.blockService.saveBlock(this.block).subscribe(message => {
      console.log('Block saved');
      console.log(message);
      this.location.back();
    });
  }

  delete() {
    this.blockService.deleteBlock(this.block.id).subscribe(message => {
      console.log('Block deleted');
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
