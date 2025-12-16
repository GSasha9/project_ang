import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { clickHelper } from '../../../test/click-helper';
import { Card } from '../../card/card';
import { Button } from '../../shared/components/button/button';
import { BOOKS_API_BASE_URL } from '../../shared/constants/books-api-base-url';
import { BooksService } from '../../shared/services/books.service';
import { Pricing } from './pricing';

describe('Pricing', () => {
  let component: Pricing;
  let fixture: ComponentFixture<Pricing>;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Pricing, Card, Button],
      providers: [provideHttpClient(), provideHttpClientTesting(), BooksService],
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
    fixture.detectChanges();
    const req = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=1`);
    req.flush({ results: [{ id: 1, title: 'Book 1' }] });

    await fixture.whenStable().then(() => {
      fixture.detectChanges();

      const cards = fixture.debugElement.queryAll(By.directive(Card));
      expect(cards.length).toBe(1);
      expect(cards[0].nativeElement.textContent).toContain('Book 1');
    });
  });

  it('show an error message if an error occurs', () => {
    fixture.detectChanges();
    const req = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=1`);
    req.flush('Failed', { status: 500, statusText: 'Internal Server Error' });

    fixture.detectChanges();

    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent).toContain('Error! Try again');
  });

  it('should fetch the next page after clicking the next button ', async () => {
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

    const req2 = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=2`);
    req2.flush({ results: [{ id: 2, title: 'Book 2' }] });

    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(Card));
    expect(cards.length).toBe(1);
    expect(cards[0].nativeElement.textContent).toContain('Book 2');
  });
});
