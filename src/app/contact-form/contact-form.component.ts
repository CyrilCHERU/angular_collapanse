import { ContactService } from './../services/contact.service';
import { Contact } from './../Models/contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contact: Contact;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl()
  });

  constructor(private http: HttpClient, private contactService: ContactService) { }

  ngOnInit() {
  }

  public handleSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

}
