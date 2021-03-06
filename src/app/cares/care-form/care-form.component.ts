import { CareService } from "../../services/care.service";
import { Care } from "../../Models/care";
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Patient } from "../../Models/patient";
import { PatientService } from "../../services/patient.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import * as moment from "moment";

@Component({
  selector: "app-care-form",
  templateUrl: "./care-form.component.html",
  styleUrls: ["./care-form.component.css"]
})
export class CareFormComponent implements OnInit {
  error = false;
  create = false;
  result: any;

  patients: Patient[] = [];
  patient: Patient;

  care: Care;
  isSubmited = false;

  careForm = new FormGroup({
    createdAt: new FormControl("", Validators.required),
    endedAt: new FormControl(),
    woundType: new FormControl("", Validators.required),
    patient: new FormControl("", Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private careService: CareService,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupération de la route et Analyse de la route
    const url = this.route.snapshot.url;
    if (url[0].path === "patients") {
      const patientId = +url[1];
      this.patientService.find(patientId).subscribe(patient => {
        this.patient = patient;
        this.careForm.patchValue({
          patient: this.patient.id
        });
      });
    } else if (url[0].path === "soins" && url[1].path !== "nouveau") {
      const careId = +url[1];
      this.careService.find(careId).subscribe(care => {
        this.create = false;
        this.care = care;
        this.careForm.patchValue(this.care);
        if (care.endedAt) {
          this.careForm.patchValue({
            createdAt: moment(this.care.createdAt).format("YYYY-MM-DD"),
            endedAt: moment(this.care.endedAt).format("YYYY-MM-DD")
          });
        }
        this.careForm.patchValue({
          createdAt: moment(this.care.createdAt).format("YYYY-MM-DD")
        });

        // Si on a un careId, il faut récupérer le patient
        this.patient = this.care.patient;
      });
    } else if (url[0].path === "soins" && url[1].path === "nouveau") {
      this.patientService
        .findAll()
        .subscribe(response => (this.patients = response));
    }

    // Création de la date du jour par défaut
    const today = new Date();
    this.careForm.patchValue({
      createdAt: moment(today).format("YYYY-MM-DD")
    });
  }

  public handleSubmit() {
    this.isSubmited = true;
    this.careForm.markAllAsTouched();
    if (this.careForm.invalid) {
      return;
    }

    if (this.patient) {
      this.careForm.patchValue({
        patient: this.patient.id
      });
    }

    const updatedCare = this.careForm.value;

    if (this.care) {
      updatedCare.id = this.care.id;
      updatedCare.patient = "/api/patients/" + updatedCare.patient;
      this.careService
        .update(updatedCare)
        .subscribe(this.onSuccess, this.onError);
      return;
    }

    updatedCare.patient = "/api/patients/" + updatedCare.patient;
    this.careService
      .createCare(updatedCare)
      .subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedCare: Care) => {
    const newCareId = updatedCare.id;
    this.error = false;

    this.router.navigateByUrl("/soins/suivi/" + newCareId + "/detail");
  };

  private onError = (httpError: HttpErrorResponse) => {
    // si ce n'est pas une erreur 400 => message d'alerte
    if (httpError.status !== 400) {
      this.error = true;
      return;
    }
    // si pas de violations
    if (!httpError.error.violations) {
      return;
    }

    // on fait apparaitre les erreur sur les différents champs
    httpError.error.violations.forEach(violation => {
      // const { propertyPath, message } = violation; // destructuring
      this.careForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  };

  cancel(id: number) {
    console.log(id);
    this.router.navigateByUrl("/cares/" + id);
  }
}
