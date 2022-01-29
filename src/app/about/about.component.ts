import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../menu/shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders!: Leader[] ;
  constructor(private leaderService: LeaderService) {

      }

  ngOnInit(){
    this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders);
  }

}


