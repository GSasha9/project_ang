import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Button } from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { BOOKS_API_BASE_URL } from '../../shared/constants/books-api-base-url';
import { BooksService } from '../../shared/services/books.service';
import { Pricing } from './pricing';

const params$ = new BehaviorSubject({ page: 1 });

describe('Pricing', () => {
  let component: Pricing;
  let fixture: ComponentFixture<Pricing>;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Pricing, Card, Button],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BooksService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: params$,
            snapshot: { queryParams: params$.value },
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

  it('make a call to fetch when clicking Next button', async () => {
    fixture.detectChanges();

    const req = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=1`);
    req.flush({ results: [{ id: 1, title: 'Book1' }] });

    await fixture.whenStable();
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.directive(Button));

    const nextButton = buttons.find((el) => el.nativeElement.textContent.trim() === 'Next');

    nextButton!.triggerEventHandler('click');

    params$.next({ page: 2 });

    const req2 = httpTesting.expectOne(`${BOOKS_API_BASE_URL}?page=2`);
    req2.flush({ results: [{ id: 2, title: 'Book2' }] });

    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(Card));
    expect(cards.length).toBe(1);
    expect(cards[0].nativeElement.querySelector('h4').textContent).toContain('Book2');
  });

  it('calls navigatedTo method with correct params', async () => {
    const navigateToSpy = vi.spyOn(component, 'navigateTo');
    const page = component.getCurrentPage();

    component.nextPage();

    params$.next({ page: page + 1 });

    const nextPage = component.getCurrentPage();
    component.prevPage();

    expect(navigateToSpy).toHaveBeenNthCalledWith(1, page + 1);
    expect(navigateToSpy).toHaveBeenNthCalledWith(2, nextPage - 1);
  });
});
