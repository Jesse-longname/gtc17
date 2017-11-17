import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gtc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  helped: number = 0;
  othersHelped: number = 0;
  isUpdate: boolean = false;
  totalHours: number = (Math.floor(Math.random() * (1037)) + 9);
  constructor() {
    this.helped = this.generateRandom();
    this.othersHelped = this.helped * 3;
    setInterval(() => {
      this.helped++;
      this.othersHelped += (this.helped * (Math.floor(Math.random() * (2)) + 1));
      this.heartPulse();
      this.totalHours += 0.5;
    }, Math.random() * 25000)
  }
  heartPulse(){
    setTimeout(() => {
      this.isUpdate = false;
    }, 750);
    this.isUpdate = true;
  }

  generateRandom(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  ngOnInit() {
  }

}
