import { PatientService } from "./../../services/patient.service";
import { Image } from "../../Models/image";
import { Patient } from "../../Models/patient";
import { HttpErrorResponse } from "@angular/common/http";
import { CareService } from "../../services/care.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Intervention } from "../../Models/intervention";
import { Component, OnInit } from "@angular/core";
import { Care } from "../../Models/care";
import { InterventionService } from "../../services/intervention.service";
import * as moment from "moment";

@Component({
  selector: "app-inter-form",
  templateUrl: "./inter-form.component.html",
  styleUrls: ["./inter-form.component.css"]
})
export class InterFormComponent implements OnInit {
  create = false;
  error = false;
  isSubmited = false;
  plus = false;
  cares: Care[] = [];
  intervention: Intervention;
  care: Care;
  patient: Patient;
  patients: Patient[] = [];
  images: Image[] = [];

  interForm = new FormGroup({
    date: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.required),
    care: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private careService: CareService,
    private interService: InterventionService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupération de la route et Analyse de la route
    const url = this.route.snapshot.url;
    if (url[0].path === "soins") {
      const careId = +url[1];
      this.careService.find(careId).subscribe(care => {
        this.care = care;
        this.create = true;
        console.log(care);
      });
    } else if (url[0].path === "interventions" && url[1].path !== "nouveau") {
      const interId = +url[1];
      this.interService.find(interId).subscribe(intervention => {
        this.intervention = intervention;
        this.interForm.patchValue(this.intervention);
        if (intervention.date) {
          this.interForm.patchValue({
            date: this.intervention.date.substr(0, 10)
          });
        }

        // Si on a un interId, il faut récupérer le soin et le patient
        this.care = this.intervention.care;
        this.patient = this.care.patient;
      });
    } else if (url[0].path === "soins" && url[1].path === "nouveau") {
      this.patientService
        .findAll()
        .subscribe(response => (this.patients = response));
    }

    // Création de la date du jour par défaut
    const today = new Date();
    this.interForm.patchValue({
      date: moment(today).format("YYYY-MM-DD")
    });
  }

  public handleSubmit() {
    // Extraction des données
    this.interForm.patchValue({
      care: "/api/cares/" + this.care.id,
      images: this.images
    });
    this.isSubmited = true;
    if (this.interForm.invalid) {
      return;
    }

    const updatedInter = this.interForm.value;

    if (this.intervention) {
      updatedInter.id = this.intervention.id;
      this.interService
        .update(updatedInter)
        .subscribe(this.onSuccess, this.onError);
      return;
    }
    // Création de l'intervention
    this.interService
      .create(updatedInter)
      .subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedInter: Intervention) => {
    const newInterId = updatedInter.id;
    this.error = false;
    this.router.navigateByUrl("/interventions/" + newInterId + "/detail");
  };

  private onError = (httpError: HttpErrorResponse) => {
    // si ce n'est pas une erreur 400 => message d'alerte
    if (httpError.status !== 400) {
      this.error = true;
      return;
    }
    // si pas de violations sur les champs
    if (!httpError.error.violations) {
      return;
    }

    // apparition des erreurs sur les différents champs
    httpError.error.violations.forEach(violation => {
      this.interForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  };

  public removeButton() {
    this.plus = true;
  }

  public cancel() {}
}
