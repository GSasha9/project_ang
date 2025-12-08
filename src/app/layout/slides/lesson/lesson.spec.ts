import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lesson } from './lesson';

describe('Lesson', () => {
  let component: Lesson;
  let fixture: ComponentFixture<Lesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lesson],
    }).compileComponents();

    fixture = TestBed.createComponent(Lesson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
