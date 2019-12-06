import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Credentials } from './models/credentials';
import { User } from './models/user';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: JwtAuthModule
})
export class JwtAuthService {

  authChanged = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public login(credentials: Credentials) {
    return this.http.post('http://localhost:8000/api/login', credentials)
      .pipe(
        map((resultat: any) => {
          console.log(resultat);
          this.authChanged.next(true);
          window.localStorage.setItem('token', resultat.token);
          return jwtDecode(resultat.token) as User;
        })
      );
  }

  public logout() {
    return this.http.get('http://localhost:8000/api/logout')
      .pipe(
        map(
          resultat => {
            this.authChanged.next(false);
            window.localStorage.removeItem('token');
            return resultat;
          }
        )
      );
  }

  public getUser() {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return jwtDecode(token) as User;
  }

  isAuthenticated() {
    return this.getUser() !== null;
  }
}
