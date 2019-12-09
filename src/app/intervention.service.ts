import { map } from 'rxjs/operators';
import { Intervention } from './Models/intervention';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private http: HttpClient) { }

  public findAll() {
    return this.http.get<Intervention>('http://localhost:8000/api/interventions')
      .pipe(
        map(response => response['hydra:memeber'] as Intervention[])
      );
  }
}
