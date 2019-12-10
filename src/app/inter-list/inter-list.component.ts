import { CareService } from './../services/care.service';
import { Intervention } from './../Models/intervention';
import { Component, OnInit } from '@angular/core';
import { Care } from '../Models/care';

@Component({
  selector: 'app-inter-list',
  templateUrl: './inter-list.component.html',
  styleUrls: ['./inter-list.component.css']
})
export class InterListComponent implements OnInit {

  cares: Care[] = [];

  constructor(private careService: CareService) { }

  ngOnInit() {
    this.careService.findAll().subscribe(response => this.care = response);

  }

}
