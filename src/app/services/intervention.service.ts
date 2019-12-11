import { map } from 'rxjs/operators';
import { Intervention } from '../Models/intervention';
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
        map(response => response['hydra:member'] as Intervention[])
      );
  }

  public update(inter: Intervention) {
    return this.http.put<Intervention>('http://localhost:8000/api/interventions/' + inter.id, inter);
  }

  public create(inter: Intervention) {
    return this.http.post<Intervention>('http://localhost:8000/api/interventions', inter);
  }

  public find(id: number) {
    return this.http.get<Intervention>('http://localhost:8000/api/interventions/' + id);

  }

  public delete(id: number) {
    return this.http.delete('http://localhost:8000/api/interventions/' + id);
  }
}
