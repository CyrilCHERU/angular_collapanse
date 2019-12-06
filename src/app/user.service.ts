import { Professional } from './Models/professional';
import { User } from './Models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // public findAllDoctors3() {
  //   return this.http.get<Professional>('http://localhost:8000/api/users')
  //     .pipe(
  //       filter((user => user.jobTitle === 'Docteur') as Professional[]));
  // }

  public findAll() {
    return this.http.get<User>('http://localhost:8000/api/users')
      .pipe(
        map(response => response['hydra:member'] as User[])
      );
  }

  public findAllDoctors() {
    return this.http.get<Professional>('http://localhost:8000/api/users')
      .pipe(
        map((response: Professional) => response['hydra:member'] as Professional[]));
    // .filter((response: Professional) => response.jobTitle === 'Docteur'));
  }
  //         .pipe(filter((response: Professional) => response.jobTitle === 'Docteur'))
  //     );
  // .pipe(
  //   filter(function (doctors) {
  //     doctors.job.title == "Docteur";
  //   })
  // );
  // public findAllDoctors2() {
  //   return this.http.get<Professional>('http://localhost:8000/api/users')
  //     .pipe(
  //       map((users: Professional) => users.filter(
  //         (user: Professional) => user.jobTitle === "Docteur"
  //       )));
  // }

  public findAllNurses() {
    return this.http.get<Professional>('http://localhost:8000/api/users')
      .pipe(
        map(response => response['hydra:member'] as Professional[])
      );
  }

  public create(user: User) {
    return this.http.post<User>('http://localhost:8000/api/users', user);
  }

}


