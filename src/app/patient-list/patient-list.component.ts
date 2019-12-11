import { PatientService } from '../services/patient.service';
import { Patient } from './../Models/patient';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  deleteMsg = false;
  result: any;
  patients: Patient[] = [];

  pages: number[] = [];
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {

    this.patientService.findAll().subscribe(response => {
      console.log(response);
      this.patients = response;
    });
  }

  handlePageChanged(page: number) {
    this.currentPage = page;
  }

  remove(id: number) {
    this.patientService.remove(id).subscribe(response => console.log(response));
    this.deleteMsg = true;
    this.router.navigateByUrl('/patients');
  }

}
