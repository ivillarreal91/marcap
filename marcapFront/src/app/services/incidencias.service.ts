import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Incidencias } from '../models/incidencias';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private incidenciasUrl: string = 'http://localhost:1234/cat_insidencias/';

  constructor(private http: HttpClient) { }

  getIncidencias(): Observable<Incidencias[]> {
    return this.http.get<Incidencias[]>(this.incidenciasUrl,httpOptions)
      .pipe(
        tap(incidencias => this.log(`fetched incidencias`)),
        catchError(this.handleError('getIncidencias', []))
      );
  }

  getIncidencia(id:string): Observable<Incidencias> {
    const url = `${this.incidenciasUrl}${id}/detail`;

    return this.http.get<Incidencias>(url,httpOptions)
      .pipe(
        tap(incidencias => this.log(`fetched Incidencias`)),
        catchError(this.handleError('getIncidencias', new Incidencias("","","","")))
      );
  }

  updateIncidencia(incidencia: Incidencias): Observable<null> {
    const url =`${this.incidenciasUrl}${incidencia._id}/update`;

    return this.http.put(url, incidencia, httpOptions).pipe(
      tap(_ => this.log(`updated Incidencia id=${incidencia._id}`)),
      catchError(this.handleError<any>('updateIncidencia'))
    );
  }

  deleteIncidencia (id: string): Observable<null> {
    const url = `${this.incidenciasUrl}/${id}/delete`;

    return this.http.delete<null>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Incidencia id=${id}`)),
      catchError(this.handleError<null>('deleteIncidencia'))
    );
  }

  createInsidencia(incidencia: Incidencias): Observable<null> {
    return this.http.post<null>(this.incidenciasUrl, incidencia, httpOptions).pipe(
      tap((data) => this.log(`added Incidencia w/ id=${data}`)),
      catchError(this.handleError<null>('addIncidencia'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('UserService: ' + message);
  }
}
