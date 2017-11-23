import { Component, OnInit } from '@angular/core';
import { StatService } from '../../services/stat.service';
import { StatChange } from '../../models/stat-change';

@Component({
  selector: 'gtc-personal-stats',
  templateUrl: './personal-stats.component.html',
  styleUrls: ['./personal-stats.component.scss']
})
export class PersonalStatsComponent implements OnInit {
  statChanges: StatChange[] = [];

  constructor(private statService: StatService) { 
    
  }

  ngOnInit() {
    let randomUser = 'User ' + Math.floor((Math.random() * 40) + 1);
    this.statService.getUserStats(randomUser).subscribe((result) => {
      let sorted = result.sort((a,b) => {
        if (a.statGroup.id == b.statGroup.id) {
          return (new Date(a.evalDate) < new Date(b.evalDate)) ? -1 : (new Date(a.evalDate) > new Date(b.evalDate)) ? 1 : 0;
        } else {
          return a.statGroup.name < b.statGroup.name ? -1 : a.statGroup.name > b.statGroup.name ? 1 : 0;
        }
      });
      let currentGroup = sorted[0] ? sorted[0].statGroup : null;
      let currentGroupId = sorted[0] ? sorted[0].statGroup.id : -1;
      let currentChange: StatChange;
      let currTot = 0;
      let currCount = -1;
      let last = 0;
      console.log(sorted);
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].statGroup.id != currentGroupId) {
          if (currentGroup.name == 'Total') {
            currentChange = new StatChange(currentGroup.name, (currTot-last)/currCount, currTot/(currCount+1), 0, sorted[i].max);
          }else {
            currentChange = new StatChange(currentGroup.name, (currTot-last)/currCount, currTot/(currCount+1));
          }
          this.statChanges.push(currentChange);
          currentGroup = sorted[i].statGroup;
          currentGroupId = sorted[i].statGroup.id;
          currTot = sorted[i].percent;
          currCount = 0;
          last = sorted[i].percent;
        } else {
          currTot += sorted[i].percent;
          currCount++;
          last = sorted[i].percent;
        }
      }
      if (currentGroupId != -1) {
        if (currentGroup.name == 'Total') {
          currentChange = new StatChange(currentGroup.name, (currTot-last)/currCount, currTot/(currCount+1), 0, sorted[sorted.length-1].max);
        } else {
          currentChange = new StatChange(currentGroup.name, (currTot-last)/currCount, currTot/(currCount+1));
        }
        this.statChanges.push(currentChange);
      }
    });
  }

}
