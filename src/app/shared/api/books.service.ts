import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private http=inject(HttpClient)
  constructor() { }
  getBooks():Observable<Books>
  {
    return this.http.get<Books>("http://localhost:8080/books");
  }
}
