import { User } from "./../../authentication/models/user";
import { JwtAuthService } from "./../../authentication/jwt-auth.service";
import { PatientService } from "../../services/patient.service";
import { Patient } from "../../Models/patient";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.css"]
})
export class PatientListComponent implements OnInit {
  user: User;
  job: string;
  deleteMsg = false;
  result: any;
  patients: Patient[] = [];
  noPatient = false;

  itemsPerPage = 5;
  currentPage = 1;

  constructor(
    private patientService: PatientService,
    private router: Router,
    public auth: JwtAuthService
  ) {}

  ngOnInit() {
    this.patientService.findAll().subscribe(response => {
      console.log(response);
      this.patients = response;
      if (this.patients.length === 0) {
        this.noPatient = true;
      }
    });
    this.user = this.auth.getUser();
    this.job = this.user.jobTitle;
  }

  handlePageChanged(page: number) {
    this.currentPage = page;
  }

  remove(id: number) {
    this.patientService.remove(id).subscribe(response => {
      this.result = response;
      const deletePatientId = this.patients.findIndex(
        patient => patient.id === id
      );
      this.patients.splice(deletePatientId, 1);
    });
  }
}
