import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPage } from './detailed-page';

describe('DetailedPage', () => {
  let component: DetailedPage;
  let fixture: ComponentFixture<DetailedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
