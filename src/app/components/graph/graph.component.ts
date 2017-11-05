import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'gtc-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  state: string;
  section: number;

  constructor(private db: AngularFirestore) {
    this.section = 0;
  }

  ngOnInit() {
    this.getAgeData();
    this.getLocationData();
    this.getGenderData();
  }

  private getAgeData() {
    this.db.collection('summary-stats').doc('ages').valueChanges().subscribe((result) => {
      this.ageChartData = [0,0,0,0,0];
      for (let age in result) {
        this.ageChartData[Math.floor((parseInt(age)-1)/5)] += result[age];
      }
    })
  }

  private getLocationData() {
    this.db.collection('summary-stats').doc('locations').valueChanges().subscribe((result) => {
      let to_sort = []
      for (let province in result) {
        to_sort.push([province,result[province]]);
      }
      let sorted = to_sort.sort((a,b) => {
        return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
      });
      this.locationChartLabels = [];
      this.locationChartData = [];
      let total = 0;
      for (let i = 0; i < sorted.length; i++) {
        if (i < 5) {
          this.locationChartLabels.push(sorted[i][0]);
          this.locationChartData.push(sorted[i][1]);
        } else {
          total += sorted[i][1];
        }
      }
      this.locationChartLabels.push('Other');
      this.locationChartData.push(total);
    })
  }

  private getGenderData() {
    this.db.collection('summary-stats').doc('genders').valueChanges().subscribe((result) => {
      this.genderChartData = [];
      this.genderChartLabels = [];
      for (let gender in result) {
        this.genderChartLabels.push(gender);
        this.genderChartData.push(result[gender]);
      }
    })
  }

  public chartColors: any[] = [
    {
      backgroundColor: ["#FFB6C1", "	#FFF68F", "#90EE90"]
    }];
// Doughnut
public oldRateChartLabels:string[] = ['0 - 3', '4 - 6', '7 - 10'];
public oldRateChartData:number[] = [500, 250, 100];
public oldRateChartType:string = 'doughnut';

public newRateChartLabels:string[] = ['0 - 3', '4 - 6', '7 - 10'];
public newRateChartData:number[] = [300, 200, 600];
public newRateChartType:string = 'doughnut';

//Doughnut Location
public locationChartLabels:string[] = ['Ontario', 'Quebec', 'British Columbia', 'Manitoba','Saskatchewan','Nunavut'];
public locationChartData:number[] = [500, 300, 400,60,80,60,150,90];
public locationChartType:string = 'doughnut';

 // Pie
 public genderChartLabels:string[] = ['Female', 'Male', 'Transgender', 'Other'];
 public genderChartData:number[] = [500, 400, 150, 100];
 public genderChartType:string = 'pie';

  // Pie
  public ageChartLabels:string[] = ['0 - 5','6 - 10', '11 - 15','15 - 20', '21+'];
  public ageChartData:number[] = [400, 500,300,150, 100];
  public ageChartType:string = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public changeSection(x: number) {
    this.section = x;
    console.log(x);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
