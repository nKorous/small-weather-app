import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'temp-gauge',
  templateUrl: './temp-gauge.component.html',
  styleUrls: ['./temp-gauge.component.css']
})
export class TempGaugeComponent implements OnInit {
  @Input() value: number = 50


  constructor() { }

  ngOnInit(): void {
  }

}
