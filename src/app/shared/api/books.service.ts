import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, Books } from '../models';

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

  addBook(val:Book)
  {
    return this.http.post("http://localhost:8080/books/add",val);
  }
}
