import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

export interface PartyEdition {
  id: number;
  name: string;
  description: string;
  local: string;
  date: string;
  actualLot;
  party;
}

@Injectable()
export class PartiesService {
    constructor(private http: HttpClient) {}

    getLots(): Observable<[]> {
      return this.http.get(API_URL + '/lot') as Observable<[]>;
    }

    getAcademicCenter(idAcademicCenter): Observable<object> {
      return this.http.get(
        API_URL + '/academic-center/' + idAcademicCenter
      ) as Observable<object>;
    }

    getAcademicCenterPartyEditions(idAcademicCenter): Observable<[]> {
        return this.http.get(
          API_URL + '/edition/academic-center/' + idAcademicCenter
        ) as Observable<[]>;
    }

    getAcademicCenterParties(idAcademicCenter): Observable<PartyEdition[]> {
      return this.http.get(
        API_URL + '/party/academic-center/' + idAcademicCenter
      ) as Observable<[]>;
    }

    createParty(party): Observable<boolean> {
      return this.http.post(API_URL + '/party', party) as Observable<boolean>;
    }

    createEdition(edition): Observable<boolean> {
      return this.http.post(API_URL + '/edition', edition) as Observable<boolean>;
    }

    updateEdition(edition): Observable<boolean> {
      return this.http.put(API_URL + '/edition/' + edition.id, edition) as Observable<boolean>;
    }

    deleteEdition(id): Observable<boolean> {
      return this.http.delete(API_URL + '/edition/' + id) as Observable<boolean>;
    }
}
