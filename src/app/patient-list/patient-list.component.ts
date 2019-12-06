import { PatientService } from './../patient.service';
import { Patient } from './../Models/patient';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];

  pages: number[] = [];
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private patientService: PatientService) { }

  ngOnInit() {

    this.patientService.findAll().subscribe(response => {
      console.log(response);
      this.patients = response;
    });
  }

  handlePageChanged(page: number) {
    this.currentPage = page;
  }

}
