import { CareService } from '../../services/care.service';
import { Care } from '../../Models/care';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-care-list',
  templateUrl: './care-list.component.html',
  styleUrls: ['./care-list.component.css']
})
export class CareListComponent implements OnInit {

  cares: Care[] = [];

  constructor(private careService: CareService) { }

  ngOnInit() {
    return this.careService.findAll().subscribe(response => this.cares = response);
  }

}
