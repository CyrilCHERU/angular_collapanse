import { HttpErrorResponse } from "@angular/common/http";
import { User } from "./../../Models/user";
import { JwtAuthService } from "./../../authentication/jwt-auth.service";
import { UserService } from "./../../services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-password-edit",
  templateUrl: "./user-password-edit.component.html",
  styleUrls: ["./user-password-edit.component.css"]
})
export class UserPasswordEditComponent implements OnInit {
  constructor(
    private auth: JwtAuthService,
    private userService: UserService,
    private router: Router
  ) {}

  hasError = false;
  errorMsg: string;
  user: User;

  passForm = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    passConfirm: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  userForm = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]),
    passConfirm: new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  ngOnInit() {
    const id = this.auth.getUser().id;
    this.userService.find(id).subscribe(user => (this.user = user));
  }

  public handleSubmit() {
    if (this.passForm.invalid) {
      return;
    }

    const passUserUpdate = this.passForm.value;

    if (passUserUpdate.password === passUserUpdate.passConfirm) {
      const updatedPassword = this.passForm.value;
      this.user.password = updatedPassword.password;
      console.log(this.user);
      this.userService
        .update(this.user)
        .subscribe(this.onSuccess, this.onError);
      console.log("ca mattch");
    } else {
      this.hasError = true;
      return (this.errorMsg = "Les mots de passe ne sont pas identiques !");
    }
  }
  private onSuccess = (updatedUser: User) => {
    this.hasError = false;
    // Redirection vers la page de login
    this.router.navigateByUrl("/profile");
  };

  private onError = (httpError: HttpErrorResponse) => {
    // si ce n'est pas une erreur 400 => message d'alerte
    if (httpError.status !== 400) {
      this.hasError = true;
      this.errorMsg = "Une Erreur est survenue !";
      return;
    }
    // si pas de violations sur les champs
    if (!httpError.error.violations) {
      return;
    }

    // apparition des erreurs sur les différents champs
    console.log(httpError.error.violations);
    httpError.error.violations.forEach(violation => {
      this.passForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  };
}
