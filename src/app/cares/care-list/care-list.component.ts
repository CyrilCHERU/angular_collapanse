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
  result: any;
  deleteMsg = false;
  currentPage = 1;
  itemsPerPage = 7;

  constructor(private careService: CareService) { }

  ngOnInit() {
    return this.careService.findAll().subscribe(response => this.cares = response);
  }

  removeCare(id: number) {
    this.careService.delete(id).subscribe(response => {
      this.result = response;
      const deleteCareId = this.cares.findIndex(care => care.id === id);
      this.cares.splice(deleteCareId, 1);
    }
    );
  }

  handlePageChanged(page: number) {
    this.currentPage = page;
  }

}
