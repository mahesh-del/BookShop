import { Component, WritableSignal, inject, signal } from '@angular/core';
import { BooksService } from '../../shared/api/books.service';
import { Book } from '../../shared/models';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CommonService } from '../../shared/api/common.service';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CardModule,ButtonModule,ChipModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  private booksApi=inject(BooksService)
  private commonApi=inject(CommonService)
  role:WritableSignal<string>=signal('');
  books:Book[]=[]
  error: any;
  ngOnInit()
  {
    this.role.set(this.commonApi.getRole())
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
