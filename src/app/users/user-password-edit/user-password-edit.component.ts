import { User } from './../../Models/user';
import { JwtAuthService } from './../../authentication/jwt-auth.service';
import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-password-edit',
  templateUrl: './user-password-edit.component.html',
  styleUrls: ['./user-password-edit.component.css']
})
export class UserPasswordEditComponent implements OnInit {

  constructor(
    private auth: JwtAuthService,
    private userService: UserService
  ) { }

  hasError = false;
  errorMsg: string;
  user: User;

  passForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  userForm = new FormGroup({
    gender: new FormControl(''),
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    job: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address1: new FormControl(''),
    address2: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    adeli: new FormControl(''),
    slug: new FormControl('')
  });

  ngOnInit() {
    const userId = this.auth.getUser().id;
    console.log(userId);
    this.userService.find(userId).subscribe(user => this.user = user);
    this.userForm.patchValue(this.user);
  }

  public handleSubmit() {
    if (this.passForm.invalid) {
      return;
    }
    const passUserUpdate = this.passForm.value;

    console.log(passUserUpdate);

    if (passUserUpdate.password === passUserUpdate.passConfirm) {
      //this.userService.update()
    } else {
      this.hasError = true;
      return this.errorMsg = 'Les mots de passe ne sont pas identiques !';
    }
  }
}
