import { map } from 'rxjs/operators';
import { Care } from '../Models/care';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CareService {

  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get('http://localhost:8000/api/cares')
      .pipe(
        map(response => response['hydra:member'] as Care[])
      );
  }

  public find(id: number) {
    return this.http.get<Care>('http://localhost:8000/api/cares/' + id);
  }

  public findForOnePatient(patientId: number) {
    return this.http.get<Care>('http://localhost:8000/api/patients/' + patientId + '/cares')
      .pipe(
        map(response => response['hydra:member'] as Care[])
      );
  }

  public createCare(care: Care) {
    return this.http.post<Care>('http://localhost:8000/api/cares', care);
  }

  public update(care: Care) {
    return this.http.put<Care>('http://localhost:8000/api/cares/' + care.id, care);
  }

  public delete(id: number) {
    return this.http.delete('http://localhost:8000/api/cares/' + id);
  }
}
