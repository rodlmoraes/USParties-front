import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) {}

    getSalesman(id): Observable<object> {
      return this.http.get(
        API_URL + '/salesman/' + id
      ) as Observable<object>;
    }

    getSalesmanPosts(id): Observable<[]> {
        return this.http.get(
          API_URL + '/ticket-post/salesman/' + id
        ) as Observable<[]>;
    }

    getPartyEditions(): Observable<[]> {
      return this.http.get(
        API_URL + '/edition'
      ) as Observable<[]>;
    }

    create(post): Observable<boolean> {
      return this.http.post(API_URL + '/ticket-post', post) as Observable<boolean>;
    }

    update(post): Observable<boolean> {
      console.log(post.id);

      return this.http.put(API_URL + '/ticket-post/' + post.id, post) as Observable<boolean>;
    }

    delete(id): Observable<boolean> {
      return this.http.delete(API_URL + '/ticket-post/' + id) as Observable<boolean>;
    }
}
