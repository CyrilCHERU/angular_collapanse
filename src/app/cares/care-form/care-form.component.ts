import { CareService } from '../../services/care.service';
import { Care } from '../../Models/care';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from '../../Models/patient';
import { PatientService } from '../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { URLSearchParams } from 'url';

@Component({
  selector: 'app-care-form',
  templateUrl: './care-form.component.html',
  styleUrls: ['./care-form.component.css']
})
export class CareFormComponent implements OnInit {

  error = false;
  create: boolean;

  patients: Patient[] = [];
  patient: Patient;

  care: Care;

  careForm = new FormGroup({
    createdAt: new FormControl('', Validators.required),
    endedAt: new FormControl(),
    woundType: new FormControl('', Validators.required),
    patient: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private careService: CareService,
    private router: Router
  ) { }

  ngOnInit() {
    // Récupération de la route et Analyse de la route
    const url = this.route.snapshot.url;
    if (url[0].path === 'patients') {
      const patientId = +url[1];
      this.patientService.find(patientId).subscribe(patient => {
        this.patient = patient;
        this.create = true;
      });
    } else if (url[0].path === 'soins') {
      const careId = +url[1];
      this.careService.find(careId).subscribe(care => {
        this.care = care;
        this.careForm.patchValue(this.care);
        if (care.endedAt) {
          this.careForm.patchValue({
            createdAt: this.care.createdAt.substr(0, 10),
            endedAt: this.care.endedAt.substr(0, 10)
          });
        }
        this.careForm.patchValue({
          createdAt: this.care.createdAt.substr(0, 10)
        });

        // Si on a un careId, il faut récupérer le patient
        this.patient = this.care.patient;
        console.log(this.patient);

      });
    }

    // Création de la date du jour par défaut
    // const todayDate = new Date();
    // todayDate = Date.now();


    // Sinon récupération de tous les patients de l'utilisateur
    // this.patientService.findAll().subscribe(response => this.patients = response);
    // this.careForm.patchValue({
    //   createdAt: moment().format('YYYY-MM-dd')
    // });
  }

  public handleSubmit() {
    console.log(this.care, this.patient);
    this.careForm.patchValue({
      patient: '/api/patients/' + this.patient.id
    });

    this.careForm.markAllAsTouched();
    if (this.careForm.invalid) {
      return;
    }

    const updatedCare = this.careForm.value;

    console.log(updatedCare);

    if (this.care) {
      updatedCare.id = this.care.id;

      this.careService.update(updatedCare).subscribe(this.onSuccess, this.onError);
      return;
    }

    this.careService.createCare(updatedCare).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedCare: Care) => {
    const patientId = +updatedCare.patient.id;
    this.error = false;
    this.router.navigateByUrl('/patients/' + this.patient.id + '/suivi');
  }

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
  }

  cancel(id: number) {
    console.log(id);
    this.router.navigateByUrl('/cares/' + id);
  }
}
