import { InterventionService } from '../../services/intervention.service';
import { Intervention } from '../../Models/intervention';
import { Component, OnInit } from '@angular/core';
import { Care } from '../../Models/care';

@Component({
  selector: 'app-inter-list',
  templateUrl: './inter-list.component.html',
  styleUrls: ['./inter-list.component.css']
})
export class InterListComponent implements OnInit {

  interventions: Intervention[] = [];

  constructor(private interService: InterventionService) { }

  ngOnInit() {
    this.interService.findAll().subscribe(response => this.interventions = response);

  }

}
