import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@shared/services/loader.service';
import { BehaviorSubject } from 'rxjs';

import { clickHelper } from '../../../test/click-helper';
import { BookCard } from '../../shared/components/book-card/book-card';
import { Button } from '../../shared/components/button/button';
import { BOOKS_API_BASE_URL } from '../../shared/constants/books-api-base-url';
import { BooksService } from '../../shared/services/books.service';
import { Pricing } from './pricing';

describe('Pricing', () => {
  let component: Pricing;
  let fixture: ComponentFixture<Pricing>;
  let httpTesting: HttpTestingController;

  const queryParams$ = new BehaviorSubject<{ page?: number }>({});

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Pricing, BookCard, Button],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BooksService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {},
            },
            queryParams: queryParams$.asObservable(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn(),
          },
        },
        {
          provide: LoaderService,
          useValue: {
            loading: signal(false),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Pricing);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('make an initial call to fetch the first page of the books catalog', async () => {
    const route = TestBed.inject(ActivatedRoute) as any;
    route.snapshot.queryParams = { page: 1 };
    fixture.detectChanges();
    const req = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=1`);
    req.flush({ results: [{ id: 1, title: 'Book 1' }] });

    await fixture.whenStable().then(() => {
      fixture.detectChanges();

      const cards = fixture.debugElement.queryAll(By.directive(BookCard));
      expect(cards.length).toBe(1);
      expect(cards[0].nativeElement.textContent).toContain('Book 1');
    });
  });

  it('should fetch the next page after clicking the next button ', async () => {
    const route = TestBed.inject(ActivatedRoute) as any;
    route.snapshot.queryParams = { page: 1 };
    fixture.detectChanges();

    const req = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=1`);
    req.flush({ results: [{ id: 1, title: 'Book 1' }] });

    await fixture.whenStable();
    fixture.detectChanges();

    const nextButton = fixture.debugElement
      .queryAll(By.directive(Button))
      .find((btn) => btn.nativeElement.textContent.trim() === 'Next')!;

    await fixture.whenStable();
    fixture.detectChanges();

    clickHelper(nextButton.nativeElement.querySelector('button'));

    route.snapshot.queryParams = { page: 2 };
    queryParams$.next({ page: 2 });

    const req2 = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=2`);

    req2.flush({ results: [{ id: 2, title: 'Book 2' }] });

    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(BookCard));
    expect(cards.length).toBe(1);
    expect(cards[0].nativeElement.textContent).toContain('Book 2');
  });
});
