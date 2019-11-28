import { Patient } from './Models/patient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get<Patient[]>('http://localhost:8000/api/patients');
  }

  public find(id: number) {
    return this.http.get<Patient>('http://localhost:8000/api/patients/' + id);
  }
}
