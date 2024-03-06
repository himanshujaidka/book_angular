import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  newBook : any = {};
  selectedBook: any = {};

  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks():void{
    this.http.get<any[]>('http://localhost:3000/books')
    .subscribe(data => this.books = data);
  }

  addBook():void{
    this.http.post('http://localhost:3000/books', this.newBook)
    .subscribe(() => {
      this.getBooks();
      this.newBook = {};
    });
    window.location.reload();
  }

  updateBook(): void{
    this.http.put(`http://localhost:3000/books/${this.selectedBook.bookid}`, this.selectedBook)
    .subscribe(() => {
      this.getBooks();
      this.selectedBook = {};
    });
    window.location.reload();
  }

  deleteBook(bookid: number): void {
    this.http.delete(`http://localhost:3000/books/${bookid}`)
    .subscribe(() => this.getBooks());
    window.location.reload();

  }
  

}
