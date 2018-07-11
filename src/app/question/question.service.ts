import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
// import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
// import 'rxjs/add/operators/toPromise';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

// Solo para conocimiento
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUrl: string;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  // getQuestions(): Promise<void | Question[]> {
  //   return this.http.get<Question[]>(this.questionsUrl)
  //              .toPromise()
  //              .then(response => response.json() as Question[])
  //              .catch((error: any) => error);
  // }
  getQuestions (sort = '-createdAt'): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionsUrl}?sort=${sort}`)
      .pipe(
        tap(heroes => this.log(`fetched questions`)),
        catchError(this.handleError('getQuestions', []))
      );
  }

  // getQuestion(id): Promise<void | Question> {
  //   const url = urljoin(this.questionsUrl, id);
  //   return this.http.get(url)
  //              .toPromise()
  //              .then(response => response.json() as Question)
  //              .catch((error: any) => error);
  // }
  getQuestion(id: string): Observable<Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.http.get<Question>(url).pipe(
      tap(_ => this.log(`fetched Question id=${id}`)),
      catchError(this.handleError<Question>(`getHero id=${id}`))
    );
  }

  // addQuestion(question: Question) {
  //   const body = JSON.stringify(question);
  //   const headers = new Headers({ 'Content-Type': 'application/json' });
  //   const token = this.getToken();
  //   return this.http.post(this.questionsUrl + token, body, { headers })
  //                   .pipe(
  //                     map((response: Response) => response.json()),
  //                     // catchError((error: Response) => Observable.throw(error.json()))
  //                     catchError(this.handleError('addQuestion', []))
  //                   );
  // }
  addQuestion (question: Question): Observable<Question> {
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = this.getToken();

    return this.http.post<Question>(this.questionsUrl + token, body, httpOptions).pipe(
      tap((q: Question) => this.log(`added question w/ id=${q._id}`)),
      catchError(this.handleError<Question>('addQuestion'))
    );
  }

  addAnswer(answer: Answer) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    // /api/question/:id/answers
    const url = urljoin(this.questionsUrl, '' + answer.question._id , 'answers');
    const token = this.getToken();

    return this.http.post(url + token, body, httpOptions)
                    .pipe(
                      // map((response: Response) => response.json()),
                      map((response: Observable<HttpResponse<Answer>>) => of(response)),
                      // map((response:Answer) => response),
                      catchError(this.handleError('addAnswer', []))
                    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`Question Service: ${message}`);
  }

  showError(message) {
    // this.snackBar.open(message, 'x', { duration: 2500 });
    this.snackBar.open(message, 'X', {
      duration: 2500
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      const errMsg = error.message ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      const { error: { error: { name } }, message } = error;
      if (name === 'TokenExpiredError') {
        this.showError('Tu sesión ha expirado');
      } else if (name === 'JsonWebTokenError') {
        this.showError('Ha habido un problema con tu sesión');
      } else {
        this.showError(message || 'Ha ocurrido un error. Inténtelo nuevamente.');
      }
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      console.error(errMsg); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
