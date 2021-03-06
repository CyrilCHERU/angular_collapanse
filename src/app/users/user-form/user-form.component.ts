import { UserService } from "../../services/user.service";
import { Job } from "./../../Models/job";
import { JobService } from "../../services/job.service";
import { User } from "./../../Models/user";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { JwtAuthService } from "src/app/authentication/jwt-auth.service";

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  error = false;
  errormsg = "";
  msg = "Une Erreur est survenue, Merci de réessayer plus tard ;)";
  isSubmited = false;
  create = false;

  user: User;

  jobs: Job[] = [];

  form = new FormGroup({
    gender: new FormControl("", Validators.required),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    job: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    address1: new FormControl("", Validators.required),
    address2: new FormControl(),
    zipCode: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    city: new FormControl("", Validators.required),
    phone: new FormControl("", [Validators.required, Validators.minLength(10)]),
    adeli: new FormControl("", [Validators.required, Validators.minLength(9)])
  });

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private auth: JwtAuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.jobService.findJobs().subscribe(response => (this.jobs = response));
    // Récupération de la route et Analyse de la route
    const url = this.route.snapshot.url;
    if (url[0].path === "profile") {
      const member = this.auth.getUser();
      const userId = member.id;
      this.userService.find(userId).subscribe(user => {
        this.user = user;

        this.form.patchValue(this.user);
        console.log(this.form.value);
      });
    }
    this.create = true;
  }

  handleSubmit() {
    // Passage à soumission
    this.isSubmited = true;

    // vérification du formulaire
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.error = true;
      this.errormsg = "Le formulaire est incomplet ou mal rempli :(";
      return;
    }

    console.log(
      this.form.get("password").value,
      this.form.get("confirmPassword").value
    );

    if (
      this.form.get("password").value !== this.form.get("confirmPassword").value
    ) {
      this.error = true;
      this.errormsg = "Les deux mots de passe doivent être identiques !";
      return;
    }

    // extraction des Données
    const user: User = this.form.value;
    user.job = "api/jobs/" + user.job;
    console.log(user);

    // si on a un utilisateur (édition)
    if (this.user) {
      user.id = this.user.id;
      // on update le patient
      this.userService.update(user).subscribe(this.onSuccess, this.onError);
      return;
    }
    // sinon, création d'un nouvel utilisateur
    this.userService.create(user).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedUser: User) => {
    this.error = false;
    // Redirection vers la page de login
    this.router.navigateByUrl("/login");
  };

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
  };
}
