import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFound } from './not-found';
import { provideRouter } from '@angular/router';
import { Home } from '../home/home';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [provideRouter([{ path: '', component: Home }])],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create not found page', () => {
    expect(component).toBeTruthy();
  });
});
