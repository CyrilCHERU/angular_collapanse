import { ContactService } from './../../services/contact.service';
import { Contact } from './../../Models/contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contact: Contact;
  isSubmited = false;
  result: any;
  error = true;
  errorMsg: any;

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  constructor(
    private http: HttpClient,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public handleSubmit() {
    this.isSubmited = true;
    if (this.contactForm.invalid) {
      console.log(this.contactForm.getError('valid', 'email'));
      return;
    }
    this.contact = this.contactForm.value;

    this.contactService.sendMail(this.contact).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (contact: Contact) => {
    this.error = false;

    // Redirection vers la page de login
    this.router.navigateByUrl('/');
  }

  private onError = (httpError: HttpErrorResponse) => {
    // si ce n'est pas une erreur 400 => message d'alerte
    if (httpError.status !== 400) {
      this.error = true;
      this.errorMsg = httpError;
      return;
    }
    // si pas de violations sur les champs
    if (!httpError.error.violations) {
      return;
    }

    // apparition des erreurs sur les différents champs
    console.log(httpError.error.violations);
    httpError.error.violations.forEach(violation => {
      this.contactForm.get(violation.propertyPath).setErrors({
        validation: violation.message
      });
    });
  }

}
