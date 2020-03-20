import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import {  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://wpt-analysis.herokuapp.com/createSheet';

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'responseType': 'text' })};
     

     postResultData(resultData): Observable<any>{ 

       return this.http.post<any>(this.baseUrl, resultData, this.httpOptions).pipe(
        tap((resultData) => console.log("data sent")));
     }

}
