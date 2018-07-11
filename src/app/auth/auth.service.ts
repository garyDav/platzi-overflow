import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Http, Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  usersUrl: string;
  currentUser?: User;

  constructor(
    private http: Http,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.usersUrl = urljoin(environment.apiUrl, 'auth');
    if (this.isLoggedIn()) {
      const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }

  signup(user) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(urljoin(this.usersUrl, 'signup'), body, {headers})
    .pipe(
      map((response: Response) => {
        const json = response.json();
        this.login(json);
        return json;
      }),
      catchError((error: Response) => {
        console.error(error);
        throw Observable.throw(error.json());
      }));
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json'});

    return this.http.post(urljoin(this.usersUrl, 'signin'), body, { headers })
      .pipe(
        map((response: Response) => {
          const json = response.json();
          this.login(json);
          return json;
        }),
        catchError((error: Response) => {
          console.error(error);
          throw Observable.throw(error);
        }));
  }

  login = ({ token, userId, firstName, lastName, email }) => {
    this.currentUser = new User(email, null, firstName, lastName, userId);
    // console.log(this.currentUser.fullName());
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/');
  }

  showError(message) {
    // this.snackBar.open(message, 'x', { duration: 2500 });
    this.snackBar.open(message, 'x', {
      duration: 2500
    });
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      const errMsg = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      console.error(errMsg); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
