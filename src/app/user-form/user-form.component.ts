import { UserService } from './../user.service';
import { Job } from './../Models/job';
import { JobService } from './../job.service';
import { User } from './../Models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  error = false;
  errormsg = '';
  msg = 'Une Erreur est survenue, Merci de réessayer plus tard ;)';

  user: User;

  jobs: Job[] = [];

  form = new FormGroup({
    gender: new FormControl('', Validators.required),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    job: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address1: new FormControl('', Validators.required),
    address2: new FormControl(),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5)
    ]),
    city: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    adeli: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9)
    ]),
  });

  constructor(
    private jobService: JobService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.jobService.findJobs().subscribe(response => this.jobs = response);
  }

  handleSubmit() {
    // vérification du formulaire
    console.log(this.form.getError('validation'));
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.error = true;
      this.errormsg = 'Le formulaire est incomplet ou mal rempli :(';
      return;
    }

    // extraction des Données
    const user: User = this.form.value;
    user.job = 'api/jobs/' + user.job;
    console.log(user);

    // si on a un utilisateur (édition)
    if (this.user) {
      user.id = this.user.id;
      // on update le patient
      this.userService
        .update(user)
        .subscribe(this.onSuccess, this.onError);
      return;
    }
    // sinon, création d'un nouvel utilisateur
    this.userService.create(user).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedUser: User) => {
    this.error = false;
    // Redirection vers la page de login
    this.router.navigateByUrl('/login');
  }

  private onError = (httpError: HttpErrorResponse) => {
    // si ce n'est pas une erreur 400 => message d'alerte
    if (httpError.status !== 400) {
      this.error = true;
      this.errormsg = this.msg;
      return;
    }
    // si pas de violations sur les champs
    if (!httpError.error.violations) {
      return;
    }

    // apparition des erreurs sur les différents champs
    console.log(httpError.error.violations);
    httpError.error.violations.forEach(violation => {
      this.form.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  }
}
