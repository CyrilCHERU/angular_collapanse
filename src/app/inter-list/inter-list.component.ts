import { Intervention } from './../Models/intervention';
import { InterventionService } from './../intervention.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inter-list',
  templateUrl: './inter-list.component.html',
  styleUrls: ['./inter-list.component.css']
})
export class InterListComponent implements OnInit {

  interventions: Intervention[] = [];

  constructor(private interService: InterventionService) { }

  ngOnInit() {
    this.interService.findAll().subscribe(response => console.log(response));
  }

}
