import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MessageService } from '../messages/message.service';
import { Persona } from '../../../app/models/Persona';
import { $ } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  cont = 5;

  private personasUrl = `http://${environment.serverIp}/examen1/persona`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonaService: ${message}`);
  }

  /** GET heroes from the server */
  /** GET heroes from the server */
  getPersonas (): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.personasUrl}/read_limit.php?limit=0&cont=${this.cont}`)
      .pipe(
        catchError(this.handleError('getPersonas', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPersona (id: number): Observable<Persona> {
    const url = `${this.personasUrl}/read_one.php?id=${id}`;
    return this.http.get<Persona>(url).pipe(
      tap(_ => this.log(`Obteniendo persona id=${id}`)),
      catchError(this.handleError<Persona>(`getPersona id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updatePersona (persona: Persona): Observable<any> {
    return this.http.post(`${this.personasUrl}/update.php`, persona, httpOptions).pipe(
      tap(_ => this.log(`Persona actualizada id=${persona.id}`)),
      catchError(this.handleError<any>('updatePersona'))
    );
  }

  /** POST: add a new hero to the server */
  addPersona (persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.personasUrl}/create.php`, persona, httpOptions).pipe(
      tap((persona: Persona) => this.log(`Persona añadida w/ id=${persona.id}`)),
      catchError(this.handleError<Persona>('addPersona'))
    );
  }

  /** DELETE: delete the hero from the server */
  deletePersona (persona: Persona | number): Observable<Persona> {
    const id = typeof persona === 'number' ? persona : persona.id;
    const url = `${this.personasUrl}/delete.php`;

    return this.http.post<Persona>(`${this.personasUrl}/delete.php`, persona, httpOptions).pipe(
      tap(_ => this.log(`Eliminar persona id=${id}`)),
      catchError(this.handleError<Persona>('deletePersona'))
    );
  }

  /* GET heroes whose name contains search term */
  searchPersonas (term: string): Observable<Persona[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Persona[]>(`${this.personasUrl}/find.php?nombre=${term}`).pipe(
      tap(_ => this.log(`Personas encontradas: "${term}"`)),
      catchError(this.handleError<Persona[]>('searchPersonas', []))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} Failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
