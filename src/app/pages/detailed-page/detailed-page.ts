import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { Observable } from 'rxjs';

import { Button } from '../../shared/components/button/button';
import { Book } from '../../shared/models/book.model';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-detailed-page',
  imports: [Button, AsyncPipe],
  templateUrl: './detailed-page.html',
  styleUrl: './detailed-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedPage implements OnInit {
  private router = inject(Router);
  private service = inject(BooksService);
  private activatedRoute = inject(ActivatedRoute);
  bookId: string | null = null;
  bookData$: Observable<Book> | null = null;

  ngOnInit(): void {
    this.bookData$ = this.activatedRoute.params.pipe(
      map((params) => params['id']),
      filter(Boolean),
      switchMap((id) => this.service.getBookById(id)),
    );
  }

  handleBackButton = (): void => {
    this.router.navigate(['/pricing']);
    this.bookId = null;
  };
}
