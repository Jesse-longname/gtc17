import { Component, OnInit } from '@angular/core';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'gtc-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  state: string;
  section: number;

  constructor(private callService: CallService) {
    this.callService.getAgeBreakdown().subscribe(result => {
      this.ageChartData = result;
    });
    this.section = 0;
  }

  ngOnInit() {
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
 public genderChartLabels:string[] = ['Female', 'Male'];
 public genderChartData:number[] = [500, 400];
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
