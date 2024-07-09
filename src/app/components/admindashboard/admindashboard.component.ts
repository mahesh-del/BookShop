import { Component, inject } from '@angular/core';
import { BooksService } from '../../shared/api/books.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {
  private booksApi = inject(BooksService)
  books: any;
  displayModal: boolean = false;
  addBook = new FormGroup({
    title: new FormControl('The Great Gatsby', Validators.required),
    author: new FormControl('F. Scott Fitzgerald'),
    genre: new FormControl('Literary Fiction'),
    price: new FormControl('12.99'),
    stock: new FormControl('30'),
    status: new FormControl('Available')

  });

  ngOnInit() {
    this.booksApi.getBooks().subscribe(data => {
      this.books = data
    })
  }
  showDialog() {
    this.displayModal = true;
  }

  hideDialog() {
    this.displayModal = false;
  }
  submit() {
    this.booksApi.addBook(this.addBook.value).subscribe({
      next:data=>alert(`${data},"Added Book Successfully"`),
      error:err=>alert(err.error)
    })
    this.hideDialog()
  }

}

