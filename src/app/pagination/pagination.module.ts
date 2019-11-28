import { PaginatePipe } from './paginate.pipe';
import { PaginationComponent } from './pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    PaginationComponent,
    PaginatePipe,
  ],
  exports: [
    PaginationComponent,
    PaginatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PaginationModule { }
