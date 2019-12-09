import { CareService } from './../care.service';
import { Care } from './../Models/care';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from './../Models/patient';
import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-care-form',
  templateUrl: './care-form.component.html',
  styleUrls: ['./care-form.component.css']
})
export class CareFormComponent implements OnInit {

  error = false;

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
    // Récupération de l'id du care
    const careId = this.route.snapshot.paramMap.get('id');
    console.log(careId);

    if (careId) {
      // Récupération du soin et de son patient
      this.careService.find(+careId).subscribe(response => this.care = response);
      console.log(this.care);
      const patientId = this.care.patient;
      this.careForm.patchValue({
        ...this.care,
        createdAt: moment(this.care.createdAt).format('YYYY-MM-dd'),
        patient: patientId
      });
      return;
    }
    // Sinon récupération de tous les patients de l'utilisateur
    this.patientService.findAll().subscribe(response => this.patients = response);
  }

  public handleSubmit() {
    console.log(this.careForm.value);
    this.careForm.markAllAsTouched();
    if (this.careForm.invalid) {
      return;
    }

    const updatedCare = this.careForm.value;
    updatedCare.patient = '/api/patients/' + updatedCare.patient;

    if (this.care) {
      updatedCare.id = this.care.id;

      this.careService.update(updatedCare).subscribe(this.onSuccess, this.onError);
      return;
    }

    this.careService.createCare(updatedCare).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedCare: Care) => {
    this.error = false;
    this.router.navigateByUrl('/patients/{{ patient.id }}/suivi');
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
}
