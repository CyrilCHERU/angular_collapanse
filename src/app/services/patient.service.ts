import { map } from "rxjs/operators";
import { Patient } from "../Models/patient";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  constructor(private http: HttpClient) {}

  public findAll() {
    return this.http
      .get<Patient[]>("http://api-collapanse.cyrilcheru.fr/public/api/patients")
      .pipe(map(response => response["hydra:member"] as Patient[]));
  }

  public find(id: number) {
    return this.http.get<Patient>(
      "http://api-collapanse.cyrilcheru.fr/public/api/patients/" + id
    );
  }

  public update(patient: Patient) {
    return this.http.put<Patient>(
      "http://api-collapanse.cyrilcheru.fr/public/api/patients/" + patient.id,
      patient
    );
  }

  public create(patient: Patient) {
    return this.http.post<Patient>(
      "http://api-collapanse.cyrilcheru.fr/public/api/patients",
      patient
    );
  }

  public remove(id: number) {
    return this.http.delete(
      "http://api-collapanse.cyrilcheru.fr/public/api/patients/" + id
    );
  }
}
