import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  private API = 'http://localhost:8081';

  public registerPlacement(body: any) {
    return this.http.post(this.API + '/addPlacement', body)
      .pipe(catchError((err) => { return throwError(err.message); }));
  }

  public listPlacements() {
    return this.http.get(this.API + '/listPlacements')
      .pipe(catchError((err) => { return throwError(err.message); }));
  }

  public deletePlacement(id: any) {
    return this.http.delete(this.API + '/removePlacement?id=' + id)
      .pipe(catchError((err) => { return throwError(err.message); }));
  }

  public updatePlacement(body: any) {
    return this.http.put(this.API + '/UpdatePlacement', body)
      .pipe(catchError((err) => { return throwError(err.message); }));
  }

}