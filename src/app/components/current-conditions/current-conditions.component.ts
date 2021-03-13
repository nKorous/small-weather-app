import { CurrentConditions } from './../../interfaces/current-conditions';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {
@Input() currentConditions: CurrentConditions = null

}
