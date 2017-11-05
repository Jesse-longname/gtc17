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
    this.getBeforeData();
    this.getAfterData();
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

  private getBeforeData() {
    this.db.collection('summary-stats').doc('before').valueChanges().subscribe((result) => {
      this.oldBarChartData = [{data: []}];
      let total = 0
      for (let stat in result) {
        total += result[stat];
      }
      for (let stat in result) {
        this.maxPercentage = Math.max(this.maxPercentage, ((result[stat]/total)*100));
        this.oldBarChartData[0].data.push(((result[stat]/total)*100).toFixed(2));
      }
      console.log(this.maxPercentage);
      this.maxPercentage = Math.floor(this.maxPercentage * 1.1);
    });
  }
  
  private getAfterData() {
    this.db.collection('summary-stats').doc('after').valueChanges().subscribe((result) => {
      this.newBarChartData = [{data: []}];
      let total = 0
      for (let stat in result) {
        total += result[stat];
      }
      for (let stat in result) {
        this.maxPercentage = Math.max(this.maxPercentage, ((result[stat]/total)*100));
        this.newBarChartData[0].data.push(((result[stat]/total)*100).toFixed(2));
      }
      console.log(this.maxPercentage);
      this.maxPercentage = Math.floor(this.maxPercentage * 1.1);
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
