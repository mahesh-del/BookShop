import { Component, inject } from '@angular/core';
import { BooksService } from '../../shared/api/books.service';
import { Book } from '../../shared/models';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CardModule,ButtonModule,ChipModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  private booksApi=inject(BooksService)
  books:Book[]=[]
  error: any;
  ngOnInit()
  {
    this.getBooks()
  }
  getBooks(){
    this.booksApi.getBooks().subscribe({
      next:(data)=>{
        this.books=data
      },
      error:(err)=>{
        this.error=err.statusText
      }
    })
  }

}
