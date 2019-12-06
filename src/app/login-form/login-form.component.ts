import { JwtAuthService } from './../authentication/jwt-auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  hasError = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth: JwtAuthService, private router: Router) { }

  ngOnInit() {
  }

  public handleSubmit() {
    this.hasError = false;

    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);

    this.auth
      .login(this.loginForm.value)
      .subscribe(resultat => {
        console.log(resultat);
        this.router.navigateByUrl('/patients');
      }, (httpError: HttpErrorResponse) => {
        // si erreur
        if (httpError.status === 401) {
          this.hasError = true;
          return;
        }
      });
  }

}
