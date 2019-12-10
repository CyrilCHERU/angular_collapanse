import { map } from 'rxjs/operators';
import { Job } from '../Models/job';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  public findJobs() {
    return this.http.get<Job>('http://localhost:8000/api/jobs')
      .pipe(
        map(response => response['hydra:member'] as Job[])
      );
  }
}
