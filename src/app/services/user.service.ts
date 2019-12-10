
import { Professional } from '../Models/professional';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';


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
        map((response: Professional) => response['hydra:member'] as Professional[]),
        map(professionals => professionals.filter(pro => pro.jobTitle === "Docteur"))
      )
      ;
  }

  public findAllNurses() {
    return this.http.get<Professional>('http://localhost:8000/api/users')
      .pipe(
        map(response => response['hydra:member'] as Professional[]),
        map(professionals => professionals.filter(pro => pro.jobTitle === "Infirmier(e)"))
      );
  }

  public create(user: User) {
    return this.http.post<User>('http://localhost:8000/api/users', user);
  }

  public update(user: User) {
    return this.http.put<User>('http://localhost/8000/api/users/' + user.id, user);
  }

}


