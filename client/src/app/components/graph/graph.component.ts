import { Component, OnInit } from '@angular/core';
import { SummaryStat } from '../../models/summary-stat';
import { SummaryStatEntry } from '../../models/summary-stat-entry';
import { StatService } from '../../services/stat.service';

@Component({
  selector: 'gtc-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  state: string;
  section: number;

  constructor(private statService: StatService) {
    this.section = 0;
  }

  ngOnInit() {
    this.getAgeData();
    this.getLocationData();
    this.getGenderData();
    this.getBeforeData();
    this.getAfterData();
    this.getRecommendsData();
  }

  private getAgeData() {
    this.statService.getSummaryStat('age').subscribe(result => {
      this.ageChartData = [0,0,0,0,0];
      result.entries.forEach((age) => {
        this.ageChartData[Math.floor((parseInt(age.key)-1)/5)] += parseInt(age.value);
      });
    });
  }

  private getLocationData() {
    this.statService.getSummaryStat('locations').subscribe(result => {
      result.entries.sort((a,b) => {
        return parseInt(a.value) < parseInt(b.value) ? 1 : parseInt(a.value) > parseInt(b.value) ? -1 : 0;
      });
      this.locationChartLabels = [];
      this.locationChartData = [];
      let total = 0;
      for (let i = 0; i < result.entries.length; i++) {
        if (i < 5) {
          this.locationChartLabels.push(result.entries[i].key);
          this.locationChartData.push(parseInt(result.entries[i].value));
        } else {
          total += parseInt(result.entries[i].value);
        }
      }
      this.locationChartLabels.push('Other');
      this.locationChartData.push(total);
    });
  }

  private getGenderData() {
    this.statService.getSummaryStat('gender').subscribe(result => {
      this.genderChartData = [];
      this.genderChartLabels = [];
      result.entries.forEach(gender => {
        this.genderChartLabels.push(gender.key);
        this.genderChartData.push(parseInt(gender.value));
      });
    });
  }

  private getBeforeData() {
    this.statService.getSummaryStat('before').subscribe(result => {
      this.oldBarChartData = [{data: []}];
      let total = 0;
      result.entries.forEach(stat => {
        total += parseInt(stat.value);
      });
      result.entries.forEach(stat => {
        this.maxPercentage = Math.max(this.maxPercentage, ((parseInt(stat.value)/total)*100));
        this.oldBarChartData[0].data.push(((parseInt(stat.value)/total)*100).toFixed(2));
      });
      this.maxPercentage = Math.floor(this.maxPercentage * 1.1);
    });
  }
  
  private getAfterData() {
    this.statService.getSummaryStat('after').subscribe(result => {
      this.newBarChartData = [{data: []}];
      let total = 0;
      result.entries.forEach(stat => {
        total += parseInt(stat.value);
      });
      result.entries.forEach(stat => {
        this.maxPercentage = Math.max(this.maxPercentage, ((parseInt(stat.value)/total)*100));
        this.newBarChartData[0].data.push(((parseInt(stat.value)/total)*100).toFixed(2));
      });
      this.maxPercentage = Math.floor(this.maxPercentage * 1.1);
    });
  }

  private getRecommendsData() {
    this.statService.getSummaryStat('recommends').subscribe(result => {
      this.netBarChartData = [{data: []}];
      result.entries.sort((a,b) => {
        return parseInt(a.key) < parseInt(b.key) ? -1 : parseInt(a.key) > parseInt(b.key) ? 1 : 0;
      });
      result.entries.forEach(stat => {
        this.netBarChartData[0].data.push(parseInt(stat.value));
      })
    });
  }

  maxPercentage: number = 0;

  public chartColors: any[] = [
    {
      backgroundColor: ["#FFB6C1", "	#FFF68F", "#90EE90"]
    }];
// Doughnut
  public oldBarChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          scaleLabel:{
            display:true,
            labelString: 'Percentage of Calls'
          },
          gridLines: {
            display: false
          },
          ticks: {
            min: 0,
            max: 30
          }
        }
      ]
    }
  };
  public oldBarChartLabels:string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
  public oldBarChartType:string = 'bar';
  public oldBarChartLegend:boolean = false;

  public oldBarChartData:any[] = [
    {data: [43, 65, 59, 80, 81, 56, 55, 40]}
  ];

  public newBarChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            min: 0,
            max: 30
          }
        }
      ]
    }
  };
  public newBarChartLabels:string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
  public newBarChartType:string = 'bar';
  public newBarChartLegend:boolean = false;
  public newBarChartColors:any[] = [
    {
      backgroundColor: ["#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90"]
    }];

  public newBarChartData:any[] = [
    {data: [70, 65, 59, 80, 81, 56, 55, 40]}
  ];

  public netBarChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
        }
      ]
    }
  };
  public netBarChartLabels:string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public netBarChartType:string = 'bar';
  public netBarChartLegend:boolean = false;
  public netBarChartColors:any[] = [
    {
      backgroundColor: ["#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90","#90EE90"]
    }];

  public netBarChartData:any[] = [
    {data: [10, 10, 10, 70, 65, 59, 80, 81, 56, 55, 40]}
  ];

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

}
