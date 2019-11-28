import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bootstrap-pagination',
  template: `
  <div *ngIf="pages.length > 1">
    <div>
      <ul class="pagination">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <button class="page-link" (click)="handlePageChange(currentPage - 1)">&laquo;</button>
        </li>
        <li class="page-item" [class.active]="page === currentPage" *ngFor="let page of pages">
          <button class="page-link" (click)="handlePageChange(page)">
            {{ page }}
          </button>
        </li>
        <li class="page-item" [class.disabled]="currentPage === pages.length">
          <button class=" page-link" (click)="handlePageChange(currentPage + 1)">&raquo;</button>
        </li>
      </ul>
    </div>
  </div>
  `,
  styles: []
})

//<app-pagination [items]="invoices" [itemsPerPage]=></app-pagination>

export class PaginationComponent {

  @Input()
  currentPage = 1;

  @Input()
  itemsPerPage = 10;

  @Input()
  items: any[] = [];

  // fabrique d evenement
  @Output()
  pageChanged = new EventEmitter<number>();

  get pages() {
    const pagesCount = Math.ceil(this.items.length / this.itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    return pages;
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}


