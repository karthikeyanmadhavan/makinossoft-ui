import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRespone } from '../models/api-respone';
import { Person } from '../models/person';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiRespone<Person[]>> {
    return this.http.get<ApiRespone<Person[]>>(`${environment.apiUrl}/person/list`);
  }

  save(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/person/save`, data);
  }
}
