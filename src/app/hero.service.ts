import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  private getHeroesAwsUrl = 'https://zpcft0yeme.execute-api.us-east-2.amazonaws.com/dev';	
  private postHeroUrl = 'https://mp5f5reaj9.execute-api.us-east-2.amazonaws.com/dev';
  private getHeroAwsUrl = 'https://mcy326s7mj.execute-api.us-east-2.amazonaws.com/dev';	
  private putHeroAwsUrl = 'https://93ncd55n86.execute-api.us-east-2.amazonaws.com/dev';
  private deleteHeroAwsUrl = 'https://mcy326s7mj.execute-api.us-east-2.amazonaws.com/dev';
  private searchHeroAwsUrl = 'https://5ejcyua7ok.execute-api.us-east-2.amazonaws.com/dev';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes() {
    const url = `${this.getHeroesAwsUrl}`;
	return this.http.get(this.getHeroesAwsUrl)
	.pipe(
      tap(_ => this.log(`fetched heros: ${url}`)),
      catchError(this.handleError<Hero>(`error in getHeroes: url: ${url}`))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number) {
    const url = `${this.getHeroAwsUrl}/${id}`;
    return this.http.get(url)
	.pipe(
      tap(_ => this.log(`fetched hero id=${url}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.searchHeroAwsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.postHeroUrl, hero, httpOptions);
	// .pipe(
      // tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      // catchError(this.handleError<Hero>('addHero'))
    //);
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.deleteHeroAwsUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.putHeroAwsUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
