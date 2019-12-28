import { Job } from "./../../Models/job";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./../../Models/user";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { JwtAuthService } from "src/app/authentication/jwt-auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { JobService } from "src/app/services/job.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
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
    email: new FormControl("", [Validators.required, Validators.email]),
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

        this.form.patchValue({
          gender: this.user.gender,
          lastName: this.user.lastName,
          firstName: this.user.firstName,
          email: this.user.email,
          address1: this.user.address1,
          address2: this.user.address2,
          zipCode: this.user.zipCode,
          city: this.user.city,
          phone: this.user.phone,
          adeli: this.user.adeli
        });
      });
    }
    this.create = true;
  }

  handleSubmit() {
    // Passage à soumission
    this.isSubmited = true;
    console.log(this.form.value);

    // vérification du formulaire
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.error = true;
      this.errormsg = "Le formulaire est incomplet ou mal rempli :(";
      return;
    }

    // extraction des Données
    const userUpdated: User = this.form.value;
    console.log(userUpdated);

    // si on a un utilisateur (édition)
    if (this.user) {
      userUpdated.id = this.user.id;
      // on update le patient
      this.userService
        .update(userUpdated)
        .subscribe(this.onSuccess, this.onError);
      return;
    }
    // sinon, création d'un nouvel utilisateur
    this.userService
      .create(userUpdated)
      .subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (updatedUser: User) => {
    this.error = false;
    // Redirection vers la page de login
    this.router.navigateByUrl("/profile");
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
