import { Component, OnInit, Input } from '@angular/core';
import { StatChange } from '../../../models/stat-change';

@Component({
  selector: 'gtc-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  @Input() statData: StatChange = new StatChange("Test", 25, 50);
  baseWidth: number;
  changeWidth: number;
  isImprovement: boolean;

  constructor() { }

  ngOnInit() {
    this.baseWidth = Math.floor(this.statData.beforePercent);
    this.changeWidth = Math.floor(this.statData.afterPercent - this.statData.beforePercent);
    this.isImprovement = this.changeWidth >= 0;
  }

}
