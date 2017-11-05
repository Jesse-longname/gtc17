import { Component, OnInit } from '@angular/core';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'gtc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private callService: CallService) { }

  ngOnInit() {
    this.callService.getAgeBreakdown().subscribe(result => {
      console.log(result);
      
    });
  }

}
