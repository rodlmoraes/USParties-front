import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

interface Entity {
  id: number;
}

const API_URL = environment.apiUrl;

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) {}

    registerSalesman(salesman): Observable<Entity> {
        return this.http.post(API_URL + '/salesman', salesman) as Observable<Entity>;
    }

    registerAcademicCenter(academicCenter: object): Observable<Entity> {
      return this.http.post(API_URL + '/academic-center', academicCenter) as Observable<Entity>;
    }
}
