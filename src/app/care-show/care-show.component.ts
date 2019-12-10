import { Care } from './../Models/care';
import { CareService } from '../services/care.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-care-show',
  templateUrl: './care-show.component.html',
  styleUrls: ['./care-show.component.css']
})
export class CareShowComponent implements OnInit {

  care: Care;

  constructor(private route: ActivatedRoute, private careService: CareService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.careService.find(id).subscribe(response => this.care = response);

  }

}
