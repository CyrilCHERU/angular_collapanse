import { JwtAuthService } from './../../authentication/jwt-auth.service';
import { AuthService } from '../../services/auth.service';
import { Professional } from '../../Models/professional';
import { UserService } from '../../services/user.service';
import { User } from '../../Models/user';
import { PatientService } from '../../services/patient.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient } from '../../Models/patient';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  isSubmited = false;
  patient: Patient;
  users: User[] = [];
  doctor: string;
  doctors: Professional[] = [];
  nurses: Professional[] = [];
  error = false;
  create = false;

  patientForm = new FormGroup({
    gender: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl('', Validators.required),
    address1: new FormControl('', Validators.required),
    address2: new FormControl(),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', Validators.email),
    doctor: new FormControl(''),
    nurses: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private patientService: PatientService,
    private router: Router,
    private auth: JwtAuthService) { }

  ngOnInit() {

    // Récupération de la liste des professionnels
    this.userService.findAll().subscribe(response => this.users = response);
    // Récupération de tous les users doctors
    this.userService.findAllDoctors().subscribe(response => this.doctors = response);
    // Récupération de tous les users nurses
    this.userService.findAllNurses().subscribe(response => this.nurses = response);
    // Récupération de l'id du patient (édition) sur la route
    const id = this.route.snapshot.paramMap.get('id');
    // si l'id est différent de null on va chercher le patient et on remplit les champs
    if (id) {
      this.patientService.find(+id).subscribe(response => {
        this.patient = response;
        this.patientForm.patchValue({
          ...response,
          birthDate: moment(response.birthDate).format('YYYY-MM-DD'),
          doctor: response.doctor
        });
      });
    }
    const user = this.auth.getUser();

    this.create = true;
  }

  public handleSubmit() {
    this.isSubmited = true;
    console.log(this.patientForm.value);
    // vérification du formulaire
    this.patientForm.markAllAsTouched();
    if (this.patientForm.invalid) {
      return;
    }
    // extraction des Données
    const patient: Patient = this.patientForm.value;
    patient.doctor = 'api/users/' + patient.doctor;
    console.log(patient.doctor);
    console.log(patient.nurses);
    patient.nurses = patient.nurses.map(id => '/api/users/' + id);

    if (patient.gender === 'Homme') {
      const id = Math.floor(Math.random() * 100);
      const pictureId = id + '.jpg';
      patient.avatar = 'http://randomuser.me/api/portraits/men/' + pictureId;
    } else {
      const id = Math.floor(Math.random() * 100);
      const pictureId = id + '.jpg';
      patient.avatar = 'http://randomuser.me/api/portraits/women/' + pictureId;
    }


    // si on a un patient (édition)
    if (this.patient) {
      patient.id = this.patient.id;
      // on update le patient
      this.patientService
        .update(patient)
        .subscribe(this.onSuccess, this.onError);
      return;
    }
    // sinon, création d'un nouveau patient
    this.patientService.create(patient).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedPatient: Patient) => {
    this.error = false;
    this.router.navigateByUrl('/patients/' + updatedPatient.id);
  }

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
      this.patientForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  }

  cancel(id: number) {
    console.log(id);
    this.router.navigateByUrl('/patients/' + id);
  }

}
