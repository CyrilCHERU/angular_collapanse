import jwtDecode from 'jwt-decode';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export interface Credentials {
  email: string;
  password: string;
}

export interface LogUser {
  id: number;
  email: string;
  role: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChanged = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getLogUser(): LogUser {
    return jwtDecode(window.localStorage.getItem('token'));
  }

  /**
   * Requete vers l'api avec email et mot de passe pour concordance BDD
   *
   */
  login(credentials: Credentials) {
    return this.http.post('http://localhost:8000/api/login', credentials)
      .pipe(
        map((resultat: any) => {
          this.authChanged.next(true);
          window.localStorage.setItem('user', JSON.stringify(resultat.user));
          return resultat.user;
        })
      );
  }

  isAuthenticated() {
    return this.getLogUser() !== null;
  }

  logout() {
    return this.http.get('http://localhost:8000/api/logout')
      .pipe(
        map(resultat => {
          window.localStorage.removeItem('user');
          this.authChanged.next(false);
          return resultat;
        })
      );
  }
}
