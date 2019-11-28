import { User } from './../Models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User;

  form = new FormGroup({
    gender: new FormControl(),
    lastName: new FormControl(),
    firstName: new FormControl(),
    jobId: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    address1: new FormControl(),
    address2: new FormControl(),
    zipCode: new FormControl(),
    city: new FormControl(),
    phone: new FormControl(),
    adeli: new FormControl(),
  });

  constructor() { }

  ngOnInit() {
  }

}
