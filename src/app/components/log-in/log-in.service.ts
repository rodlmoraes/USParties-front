import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

interface Entity {
  id: number;
}

const API_URL = environment.apiUrl;

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    loginSalesman(salesman): Observable<Entity> {
        return this.http.get(API_URL + '/salesman/check-password/'
          + salesman.email + '/' + salesman.password
        ) as Observable<Entity>;
    }

    loginAcademicCenter(academicCenter): Observable<Entity> {
      return this.http.get(API_URL + '/academic-center/check-password/'
        + academicCenter.email + '/' + academicCenter.password
      ) as Observable<Entity>;
    }
}
