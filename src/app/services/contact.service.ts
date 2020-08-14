import { Contact } from './../Models/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMail(contact: Contact) {
    return this.http.post('http://api-collapanse.cyrilcheru.fr/public/api/contact', contact);
  }
}
