import { Contact } from './../Models/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMail(contact: Contact) {
    return this.http.post<Contact>('http://localhost:8000/api/contact', contact);
  }
}
